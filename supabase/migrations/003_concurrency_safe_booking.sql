-- ============================================================
-- Migration 003: Concurrency-Safe Booking Stored Function
-- Project: Agri-Share
-- Description:
--   Addresses academic DBMS concurrency and overlap prevention requirements.
--   Uses PostgreSQL row-level locking (FOR UPDATE) to serialize booking requests
--   on the target equipment item, guaranteeing that two concurrent requests
--   cannot double-book the same machine for overlapping date ranges.
-- ============================================================

CREATE OR REPLACE FUNCTION public.create_booking_safe(
  p_renter_id INTEGER,
  p_equipment_id INTEGER,
  p_driver_id INTEGER,
  p_start_date DATE,
  p_end_date DATE,
  p_total_cost NUMERIC
)
RETURNS TABLE (
  booking_id INTEGER,
  error_message TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_booking_id INTEGER;
  v_conflict_count INTEGER;
  v_current_status VARCHAR;
BEGIN
  -- 1. Date validity checks
  IF p_end_date < p_start_date THEN
    RETURN QUERY SELECT NULL::INTEGER, 'End date cannot precede start date.'::TEXT;
    RETURN;
  END IF;

  IF p_start_date < CURRENT_DATE THEN
    RETURN QUERY SELECT NULL::INTEGER, 'Cannot create booking for past dates.'::TEXT;
    RETURN;
  END IF;

  -- 2. Concurrency Lock: Lock the equipment row to serialize concurrent transactions
  SELECT status INTO v_current_status
  FROM public.equipment
  WHERE equipment_id = p_equipment_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN QUERY SELECT NULL::INTEGER, 'Specified equipment does not exist.'::TEXT;
    RETURN;
  END IF;

  IF v_current_status <> 'AVAILABLE' THEN
    RETURN QUERY SELECT NULL::INTEGER, 'Equipment is currently unavailable or under maintenance.'::TEXT;
    RETURN;
  END IF;

  -- 3. Overlap check: Check for conflicting active bookings (PENDING or CONFIRMED)
  SELECT COUNT(*) INTO v_conflict_count
  FROM public.bookings
  WHERE equipment_id = p_equipment_id
    AND status IN ('PENDING', 'CONFIRMED')
    AND NOT (end_date < p_start_date OR start_date > p_end_date);

  IF v_conflict_count > 0 THEN
    RETURN QUERY SELECT NULL::INTEGER, 'Equipment is already reserved for overlapping dates.'::TEXT;
    RETURN;
  END IF;

  -- 4. Atomic Insertion
  INSERT INTO public.bookings (
    renter_id,
    equipment_id,
    driver_id,
    start_date,
    end_date,
    total_cost,
    status
  )
  VALUES (
    p_renter_id,
    p_equipment_id,
    p_driver_id,
    p_start_date,
    p_end_date,
    p_total_cost,
    'PENDING'
  )
  RETURNING bookings.booking_id INTO v_booking_id;

  -- Return successfully generated booking ID
  RETURN QUERY SELECT v_booking_id, NULL::TEXT;
END;
$$;

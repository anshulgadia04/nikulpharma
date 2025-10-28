// Simple phone normalization helper
// Converts input to digits-only E.164-like string (no leading +)
export function normalizePhone(raw) {
  if (!raw) return null;
  // Remove common formatting characters
  const digits = String(raw).replace(/[^0-9+]/g, "").replace(/^\+/, "");
  if (!digits) return null;

  // Basic sanity: ensure at least 8 digits
  if (digits.length < 8) return null;

  return digits; // caller can prepend country code if needed
}

export default normalizePhone;

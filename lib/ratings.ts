/** Word for a 0–10 editorial score. */
export const scoreWording = (s: number): string => {
  if (s >= 9.9) return 'Outstanding';
  if (s >= 9.5) return 'Excellent';
  if (s >= 9.0) return 'Very Good';
  if (s >= 8.5) return 'Good';
  return 'Fair';
};

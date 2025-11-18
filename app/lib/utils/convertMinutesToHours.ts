/**
 * Converts the given time in minutes to a formatted string representing hours and minutes.
 *
 * @param {number} time - The time in minutes to be converted.
 * @returns {string} - A formatted string representing hours and minutes (e.g., '2h 30m'), or 'N/A' if invalid.
 *
 * @example
 * // Usage example:
 * const timeInMinutes = 150;
 * const formattedTime = convertMinutesToHours(timeInMinutes);
 * console.log(formattedTime); // Output: '2h 30m'
 *
 * @example
 * // Usage example with invalid time:
 * const invalidTime = 0;
 * const result = convertMinutesToHours(invalidTime);
 * console.log(result); // Output: 'N/A'
 */
export const convertMinutesToHours = (time: number): string => {
  // Check if the input is a valid positive integer
  if (!time || !Number.isInteger(time) || time <= 0) {
    return '-- min';
  }

  // Calculate hours and minutes
  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  // Return the formatted string
  if (hours === 0) {
    return `${minutes}m`;
  }

  if (minutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${minutes}m`;
};

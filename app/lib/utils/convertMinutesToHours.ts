/**
 * Converts the given time in minutes to a formatted string representing hours and minutes.
 *
 * @param {number} time - The time in minutes to be converted.
 * @returns {string|number} - A formatted string representing hours and minutes (e.g., '2h 30m'), or the original value if it's not a positive integer.
 * @throws {Error} - Throws an error if the input time is not a positive integer.
 *
 * @example
 * // Usage example:
 * const timeInMinutes = 150;
 * const formattedTime = convertMinutesToHours(timeInMinutes);
 * console.log(formattedTime); // Output: '2h 30m'
 *
 * @example
 * // Usage example with invalid time (throws an error):
 * const invalidTime = 'abc';
 * try {
 *   const result = convertMinutesToHours(invalidTime);
 *   console.log(result); // This line won't be reached
 * } catch (error) {
 *   console.error(error.message); // Output: 'Invalid time: abc'
 * }
 */
export const convertMinutesToHours = (time: number): string | number => {
  // Check if the input is a positive integer
  if (Number.isInteger(time) && time > 0) {
    // Calculate hours and minutes
    const hours = Math.floor(time / 60);
    const minutes = time % 60;

    // Return the formatted string
    return `${hours}h ${minutes}m`;
  }

  // Throw an error for invalid input
  throw new Error(`Invalid time: ${time}`);
};

/**
 * Class representing an error that occurs when an invalid UUID is encountered.
 * This class extends the built-in Error class and adds a name property to allow
 * for more accurate error handling.
 */
export default class InvalidUuidError extends Error {
  /**
   * Creates a new InvalidUuidError instance.
   *
   * @param {string} [message] - Optional error message. If not provided, a default
   * message will be used.
   */
  constructor(message?: string) {
    // Call the superclass constructor with the provided message or a default message.
    super(message || "Invalid UUID");
    // Set the name property to allow for more accurate error handling.
    this.name = "InvalidUuidError";
  }
}

/**
 * Enum representing different payment types.
 * Each payment type has a corresponding code.
 * @readonly
 * @enum {string | null}
 */
enum PaymentType {
  totalPay = 'PT',
  mandatoryDonation = 'DO',
  voluntaryDonation = 'DV',
  free = null,
}
/**
 * Object mapping payment type keys to their respective codes.
 * Use these keys when working with payment-related functionality.
 * @type {Object}
 * @property {string} totalPay - Code for total payment.
 * @property {string} mandatoryDonation - Code for mandatory donation.
 * @property {string} voluntaryDonation - Code for voluntary donation.
 * @property {null} free - Code for free (no payment required).
 */
export const paymentType = {
  totalPay: PaymentType.totalPay,
  mandatoryDonation: PaymentType.mandatoryDonation,
  voluntaryDonation: PaymentType.voluntaryDonation,
  free: PaymentType.free,
};

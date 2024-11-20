/* eslint-disable no-undef */
/**
 * Function to generate IziPay configuration.
 *
 * @function
 * @param {Object} params - Configuration parameters for IziPay.
 * @param {string} params.TRANSACTION_ID - Unique transaction identifier.
 * @param {string} params.MERCHANT_CODE - Merchant code for IziPay.
 * @param {string} params.ORDER_NUMBER - Order number for the transaction.
 * @param {string} params.ORDER_CURRENCY - Currency code for the order.
 * @param {number} params.ORDER_AMOUNT - Amount for the order.
 * @param {number} params.currentTimeUnix - Current time in Unix timestamp format.
 * @returns {Object} - IziPay configuration object.
 */
export const iziConfigFuntion = ({
  TRANSACTION_ID,
  MERCHANT_CODE,
  ORDER_NUMBER,
  ORDER_CURRENCY,
  ORDER_AMOUNT,
  currentTimeUnix,
}) => {
  return {
    // Specific configuration for IziPay
    config: {
      transactionId: TRANSACTION_ID,
      action: Izipay.enums.payActions.PAY,
      merchantCode: MERCHANT_CODE,
      order: {
        orderNumber: ORDER_NUMBER,
        currency: ORDER_CURRENCY,
        amount: ORDER_AMOUNT,
        processType: Izipay.enums.processType.AUTHORIZATION,
        merchantBuyerId: 'mc1768',
        dateTimeTransaction: currentTimeUnix,
        payMethod: Izipay.enums.showMethods.YAPE,
      },
      billing: {
        firstName: 'Juan',
        lastName: 'Wick',
        email: 'jwick@izipay.pe',
        phoneNumber: '989339999',
        street: 'calle el demo',
        city: 'lima',
        state: 'lima',
        country: 'PE',
        postalCode: '00001',
        document: '12345678',
        documentType: Izipay.enums.documentType.DNI,
      },
      render: {
        typeForm: Izipay.enums.typeForm.POP_UP,
        showButtonProcessForm: false,
      },
      appearance: {
        logo: 'https://cursosya.info/_next/static/media/cinergiaLogoFucsia.05377d54.svg',
      },
    },
  };
};

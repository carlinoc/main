"use client";

import { useEffect, useState, useRef } from "react";
import { saveMoviePay } from '@/app/lib/data/saveMoviePay'
import { formatPrice } from '@/app/lib/utils/formatPrice';

declare global {
  interface Window {
    MercadoPago: any;
  }
}

interface PaymentModalProps {
  show: boolean;
  onClose: () => void;
  amount: number;
  movieId?: string;
  userEmail?: string;
  userId?: string;
  countryCode: string;
  onSuccess?: (msg: string) => void;
  onError?: (msg: string) => void;
}

export default function PaymentModal({ 
  show, 
  onClose, 
  amount = 100,
  movieId,
  userEmail,
  userId,
  countryCode,
  onSuccess,
  onError 
}: PaymentModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
  const [identificationTypes, setIdentificationTypes] = useState<any[]>([]);
  const [issuers, setIssuers] = useState<any[]>([]);
  const [installments, setInstallments] = useState<any[]>([]);
  const [customAmount, setCustomAmount] = useState(amount);
  const [cardType, setCardType] = useState<string>("");
  
  const mpRef = useRef<any>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!window.MercadoPago) {
      const script = document.createElement("script");
      script.src = "https://sdk.mercadopago.com/js/v2";
      script.async = true;
      script.onload = () => {
        mpRef.current = new window.MercadoPago(
          process.env.NEXT_PUBLIC_MP_PUBLIC_KEY,
          { locale: "es-PE" }
        );
        console.log("SDK de MercadoPago cargado");
      };
      document.body.appendChild(script);
    } else if (!mpRef.current) {
      mpRef.current = new window.MercadoPago(
        process.env.NEXT_PUBLIC_MP_PUBLIC_KEY,
        { locale: "es-PE" }
      );
    }
  }, []);

  useEffect(() => {
    if (!show || !mpRef.current) return;

    const loadInitialData = async () => {
      try {
        const identTypes = await mpRef.current.getIdentificationTypes();
        setIdentificationTypes(identTypes);
      } catch (err) {
        console.error("Error cargando datos iniciales:", err);
        setError("Error al cargar información de pago");
      }
    };

    loadInitialData();
  }, [show]);

  const detectCardType = (cardNumber: string) => {
    const firstDigit = cardNumber.charAt(0);
    if (firstDigit === '4') return 'visa';
    if (firstDigit === '5') return 'mastercard';
    if (firstDigit === '3') return 'amex';
    return '';
  };

  const handleCardNumberChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cardNumber = e.target.value.replace(/\s/g, "");
    setCardType(detectCardType(cardNumber));
    
    if (cardNumber.length >= 6) {
      try {
        const bin = cardNumber.substring(0, 6);
        const paymentMethod = await mpRef.current.getPaymentMethods({ bin: bin });
        
        if (paymentMethod.results && paymentMethod.results.length > 0) {
          const method = paymentMethod.results[0];
          setSelectedPaymentMethod(method.id);
          
          const issuersData = await mpRef.current.getIssuers({
            paymentMethodId: method.id,
            bin: bin,
          });
          setIssuers(issuersData);

          const installmentsData = await mpRef.current.getInstallments({
            amount: customAmount.toString(),
            bin: bin,
          });
          
          if (installmentsData && installmentsData.length > 0) {
            const methodInstallments = installmentsData.find(
              (inst: any) => inst.payment_method_id === method.id
            );
            
            if (methodInstallments?.payer_costs) {
              setInstallments(methodInstallments.payer_costs);
            }
          }
        }
      } catch (err) {
        console.error("Error obteniendo información de la tarjeta:", err);
      }
    } else {
      setSelectedPaymentMethod("");
      setIssuers([]);
      setInstallments([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const form = formRef.current;
    if (!form) return;

    try {
      const cardData = {
        cardNumber: (form.cardNumber as HTMLInputElement).value.replace(/\s/g, ""),
        cardholderName: (form.cardholderName as HTMLInputElement).value,
        cardExpirationMonth: (form.expirationDate as HTMLInputElement).value.split("/")[0],
        cardExpirationYear: "20" + (form.expirationDate as HTMLInputElement).value.split("/")[1],
        securityCode: (form.securityCode as HTMLInputElement).value,
        identificationType: (form.identificationType as HTMLSelectElement).value,
        identificationNumber: (form.identificationNumber as HTMLInputElement).value,
      };

      const token = await mpRef.current.createCardToken(cardData);
      
      const paymentData = {
        token: token.id,
        issuer_id: (form.issuer as HTMLSelectElement).value,
        payment_method_id: selectedPaymentMethod,
        transaction_amount: customAmount,
        installments: 1,
        // installments: parseInt((form.installments as HTMLSelectElement).value),
        description: movieId ? `Donación para ver película ${movieId}` : "Donación",
        payer: {
          email: (form.email as HTMLInputElement).value,
          identification: {
            type: cardData.identificationType,
            number: cardData.identificationNumber,
          },
        },
        movieId: movieId,
        userId: userId,
        userEmail: userEmail || (form.email as HTMLInputElement).value,
      };

      // console.log("Datos de pago:", paymentData);

      const response = await fetch("/api/process_payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Error al procesar el pago");
      }

      if (result.status === "approved") {
        const successMsg = "¡Pago aprobado! Ya puedes ver el video 🎉";
        if (onSuccess) {
          await saveMoviePay(String(result.id), userId, movieId , 0, '', customAmount, countryCode);
          onSuccess(successMsg);
        } else {
          alert(successMsg);
        }
        handleClose();
      } else if (result.status === "pending") {
        const pendingMsg = "Pago pendiente. Te notificaremos cuando se complete.";
        if (onSuccess) {
          await saveMoviePay(String(result.id), userId, movieId , 0, '', customAmount, countryCode);
          onSuccess(pendingMsg);
        } else {
          alert(pendingMsg);
        }
        handleClose();
      } else if (result.status === "rejected") {
        const errorMsg = `Pago rechazado`;
        setError(errorMsg);
        // if (onError) {
        //   onError(errorMsg);
        // } else {
        //   setError(errorMsg);
        // }
      } else {
        const statusMsg = `Estado del pago: ${result.status}`;
        setError(statusMsg);
        // if (onError) {
        //   onError(statusMsg);
        // } else {
        //   setError(statusMsg);
        // }
      }
      
    } catch (err: any) {
      console.error("Error procesando pago:", err);
      const errorMsg = err.message || "Error al procesar el pago";
      setError(errorMsg);
      // if (onError) {
      //   onError(errorMsg);
      // } else {
      //   setError(errorMsg);
      // }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setError(null);
    setSelectedPaymentMethod("");
    setIssuers([]);
    setInstallments([]);
    setCustomAmount(amount);
    setCardType("");
    onClose();
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    return parts.length ? parts.join(" ") : value;
  };

  const formatExpirationDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-4 w-full max-w-md relative max-h-[96vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Cerrar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-3">
          <h2 className="text-xl font-bold text-gray-800">Realizar donación</h2>
          <div className="flex items-center justify-between mt-0.5">
            <p className="text-xs text-gray-500">Ingresa los datos de tu tarjeta</p>
            <div className="flex gap-1">
              <img src="/images/visalogo.png" alt="Visa" className="h-8"/>
              <img src="/images/dinerslogo.png" alt="Diners" className="h-8"/>
              <img src="/images/mastercardlogo.png" alt="Mastercard" className="h-8"/>
              <img src="/images/amexlogo.png" alt="Amex" className="h-8"/>
            </div>
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-2.5">
          {/* Monto */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-2.5 border border-blue-200">
            <label className="block text-[11px] font-semibold text-gray-700 mb-1">
              Monto de donación ( mínimo USD {formatPrice(amount)} )
            </label>
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-700">USD</span>
              <input
                type="number"
                value={formatPrice(customAmount)}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (value >= amount) setCustomAmount(value);
                }}
                min={amount}
                step="1.00"
                className="w-full pl-14 pr-2.5 py-1.5 text-lg font-bold text-gray-800 bg-white border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Número de tarjeta */}
          <div>
            <label className="block text-[11px] font-semibold text-gray-700 mb-1">Número de tarjeta</label>
            <div className="relative">
              <input 
                name="cardNumber"
                type="text"
                maxLength={19}
                placeholder=""
                onChange={(e) => {
                  e.target.value = formatCardNumber(e.target.value);
                  handleCardNumberChange(e);
                }}
                className="w-full px-2.5 py-1.5 text-sm text-gray-800 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                required
              />
              {cardType && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <div className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${
                    cardType === 'visa' ? 'bg-blue-100 text-blue-600' :
                    cardType === 'mastercard' ? 'bg-orange-100 text-orange-600' :
                    'bg-cyan-100 text-cyan-600'
                  }`}>
                    {cardType.toUpperCase()}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Vencimiento y CVV */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">Vencimiento</label>
              <input 
                name="expirationDate"
                type="text"
                maxLength={5}
                placeholder="MM/AA"
                onChange={(e) => {
                  e.target.value = formatExpirationDate(e.target.value);
                }}
                className="w-full px-2.5 py-1.5 text-sm text-gray-800 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">CVV</label>
              <input 
                name="securityCode"
                type="text"
                maxLength={4}
                placeholder=""
                pattern="[0-9]{3,4}"
                className="w-full px-2.5 py-1.5 text-sm text-gray-800 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                required
              />
            </div>
          </div>

          {/* Nombre */}
          <div>
            <label className="block text-[11px] font-semibold text-gray-700 mb-1">Nombre del titular</label>
            <input 
              name="cardholderName"
              type="text"
              placeholder=""
              pattern="[A-Za-zÀ-ÿ\s]{3,}"
              className="w-full px-2.5 py-1.5 text-sm text-gray-800 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase" 
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-[11px] font-semibold text-gray-700 mb-1">Correo electrónico</label>
            <input 
              name="email"
              type="email"
              placeholder="tu@email.com"
              defaultValue={userEmail}
              className="w-full px-2.5 py-1.5 text-sm text-gray-800 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required
            />
          </div>

          {/* Documento */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">Tipo documento</label>
              <select 
                name="identificationType"
                className="w-full px-2.5 py-1.5 text-sm text-gray-800 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Seleccionar...</option>
                {identificationTypes.map((type) => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">Número</label>
              <input 
                name="identificationNumber"
                type="text"
                placeholder=""
                pattern="[0-9]{8,12}"
                className="w-full px-2.5 py-1.5 text-sm text-gray-800 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                required
              />
            </div>
          </div>

          {/* Banco */}
          {issuers.length > 0 && (
            <div>
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">Banco emisor</label>
              <select 
                name="issuer"
                className="w-full px-2.5 py-1.5 text-sm text-gray-800 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Seleccionar...</option>
                {issuers.map((issuer) => (
                  <option key={issuer.id} value={issuer.id}>{issuer.name}</option>
                ))}
              </select>
            </div>
          )}

          {/* Cuotas */}
          {installments.length > 0 && (
            <div className="hidden">
              <label className="block text-[11px] font-semibold text-gray-700 mb-1">Cuotas</label>
              <select 
                name="installments"
                className="w-full px-2.5 py-1.5 text-sm text-gray-800 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar...</option>
                {installments.map((installment) => (
                  <option key={installment.installments} value={installment.installments}>
                    {installment.recommended_message}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !selectedPaymentMethod}
            className={`w-full py-2.5 rounded-lg font-bold text-sm transition-all mt-3 ${
              isLoading || !selectedPaymentMethod
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Procesando...
              </span>
            ) : (
              `Donar USD ${formatPrice(customAmount) }`
            )}
          </button>
        </form>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-3 py-2 rounded mb-3 mt-2">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-2 pt-2">
          <div className="flex items-center justify-center gap-2">
            <svg className="w-3.5 h-3.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <p className="text-[10px] text-gray-500">
              Pago seguro por 
            </p>
            <div className="flex gap-1">
              <img 
                src="/images/mplogo1.png" 
                alt="Mercado Pago" 
                className="h-12 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
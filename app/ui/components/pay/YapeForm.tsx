'use client';
import { useEffect, useState } from 'react';
import { saveMoviePay } from '@/app/lib/data/saveMoviePay';
import { formatPrice } from '@/app/lib/utils/formatPrice';

interface YapeFormProps {
  isOpen: boolean;
  onClose: () => void;
  movieId: string;
  minAmount: number;
  userEmail: string;
  userId: string;
  countryCode: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

// ✅ Definimos una interfaz mínima para evitar el uso de `any`
interface MercadoPagoInstance {
  yape: (options: { phoneNumber: string; otp: string }) => {
    create: () => Promise<{ id?: string }>;
  };
}

declare global {
  interface Window {
    MercadoPago?: new (
      publicKey: string,
      options: { locale: string },
    ) => MercadoPagoInstance;
  }
}

export function YapeForm({
  isOpen,
  onClose,
  movieId,
  minAmount,
  userEmail,
  userId,
  countryCode,
  onSuccess,
  onError,
}: YapeFormProps) {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [amount, setAmount] = useState(minAmount);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    phone?: string;
    otp?: string;
    amount?: string;
  }>({});
  const [alertPay, setAlertPay] = useState<string | null>(null);

  // ✅ Cargar SDK solo si se abre el modal
  useEffect(() => {
    if (!isOpen) return;
    if (!window.MercadoPago) {
      const s = document.createElement('script');
      s.src = 'https://sdk.mercadopago.com/js/v2';
      s.async = true;
      s.onload = () => console.log('MercadoPago SDK cargado');
      document.body.appendChild(s);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // ✅ Validar datos antes de enviar
  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!/^\d{9}$/.test(phone)) {
      newErrors.phone = 'Por favor, ingresa un número de 9 dígitos';
    }

    if (!/^\d{6}$/.test(otp)) {
      newErrors.otp = 'El código debe contener exactamente 6 dígitos';
    }

    if (!amount || amount < minAmount) {
      newErrors.amount = `El monto debe ser al menos S/ ${formatPrice(minAmount)}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAlertPay(null);

    if (!validateForm()) {
      onError('Por favor, verifica los datos ingresados');
      return;
    }

    try {
      setLoading(true);
      const publicKey = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY;
      if (!publicKey) throw new Error('Falta la clave pública de MercadoPago');

      if (!window.MercadoPago) {
        throw new Error('SDK de MercadoPago no disponible');
      }

      const mp = new window.MercadoPago(publicKey, { locale: 'es-PE' });
      const yape = mp.yape({ phoneNumber: phone, otp });
      const tokenRes = await yape.create();
      if (!tokenRes?.id) throw new Error('Error generando token Yape');

      const res = await fetch('/api/paymentyape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: tokenRes.id,
          transaction_amount: amount,
          description: `Donación por película ID: ${movieId}`,
          installments: 1,
          payment_method_id: 'yape',
          payer: { email: userEmail },
        }),
      });

      const data = await res.json();
      if (res.ok && data.status === 'approved') {
        await saveMoviePay(
          String(data.id),
          userId,
          movieId,
          amount,
          phone,
          0,
          countryCode,
        );
        onSuccess('¡Pago con Yape exitoso!');
        setPhone('');
        setOtp('');
        setAmount(minAmount);
        setErrors({});
        setAlertPay(null);
      } else {
        setAlertPay(
          data.status === 'rejected'
            ? 'Tu pago ha sido rechazado. Verifica tus datos e intenta nuevamente.'
            : 'No pudimos procesar tu pago. Por favor, intenta de nuevo.',
        );
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        onError(`Error al realizar el pago: ${err.message}`);
      } else {
        onError('Ocurrió un error desconocido.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black/60 via-black/50 to-purple-900/30 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Decoración superior */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 opacity-10"></div>

        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 hover:rotate-90"
        >
          <span className="text-2xl leading-none">×</span>
        </button>

        <div className="relative p-6">
          {/* Logo de Cinergia */}
          <div className="flex justify-center mb-3">
            <img
              src="/cinergiaLogoWeb1.svg"
              alt="Cinergia"
              className="h-10 object-contain drop-shadow-lg"
            />
          </div>

          {/* Título */}
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-1">
              Donar con Yape
            </h2>
            <p className="text-xs text-gray-500">
              Completa los datos para realizar tu donación
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Número de celular */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                📱 Número de celular
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full border-2 rounded-xl px-4 py-2.5 text-gray-600 focus:outline-none transition-all duration-200 ${
                  errors.phone
                    ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                    : 'border-gray-200 bg-gray-50 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100'
                }`}
                placeholder="Ej. 999888777"
                maxLength={9}
                inputMode="numeric"
              />
              {errors.phone && (
                <div className="flex items-start gap-2 mt-2 text-red-600 text-xs bg-red-50 p-2 rounded-lg border border-red-200">
                  <span>{errors.phone}</span>
                </div>
              )}
            </div>

            {/* Código OTP */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                🔒 Código de aprobación
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className={`w-full border-2 rounded-xl px-4 py-2.5 text-gray-600 focus:outline-none transition-all duration-200 font-semibold ${
                  errors.otp
                    ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                    : 'border-gray-200 bg-gray-50 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100'
                }`}
                maxLength={6}
                inputMode="numeric"
              />
              <p className="text-xs text-gray-500 mt-2">
                Ve a tu Yape y encuentra el código en{' '}
                <span className="font-semibold">
                  &quot;Aprobar Compras&quot;.
                </span>
              </p>
              {errors.otp && (
                <div className="flex items-start gap-2 mt-2 text-red-600 text-xs bg-red-50 p-2 rounded-lg border border-red-200">
                  <span>{errors.otp}</span>
                </div>
              )}
            </div>

            {/* Monto a donar */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                💰 Monto a donar{' '}
                <span className="text-gray-400 text-xs">
                  (mínimo S/ {formatPrice(minAmount)})
                </span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                  S/
                </span>
                <input
                  type="number"
                  value={formatPrice(amount)}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  step="1"
                  className={`w-full border-2 rounded-xl pl-12 pr-4 py-2.5 text-gray-600 focus:outline-none transition-all duration-200 font-semibold ${
                    errors.amount
                      ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                      : 'border-gray-200 bg-gray-50 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100'
                  }`}
                />
              </div>
              {errors.amount && (
                <div className="flex items-start gap-2 mt-2 text-red-600 text-xs bg-red-50 p-2 rounded-lg border border-red-200">
                  <span>{errors.amount}</span>
                </div>
              )}
            </div>

            {/* Botón */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-white font-bold rounded-xl mt-1 text-base shadow-lg transition-all duration-200 ${
                loading
                  ? 'bg-gradient-to-r from-purple-300 to-purple-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Procesando pago...
                </span>
              ) : (
                `Yapear S/ ${formatPrice(amount)}`
              )}
            </button>

            {/* Alerta de pago */}
            {alertPay && (
              <div className="mt-1 text-center px-4 py-3 rounded-xl bg-gradient-to-r from-red-50 to-red-100 text-red-700 border-2 border-red-200 shadow-md animate-in slide-in-from-top duration-300">
                <div className="flex items-center justify-center gap-2 font-medium text-sm">
                  <span>{alertPay}</span>
                </div>
              </div>
            )}
          </form>

          {/* Logos de Yape y Mercado Pago */}
          <div className="flex items-center justify-center gap-6 mt-5 pt-4 border-t-2 border-gray-100">
            <img
              src="/images/logoyape1.png"
              alt="Yape"
              className="h-10 object-contain opacity-80 hover:opacity-100 transition-opacity"
            />
            <div className="w-px h-8 bg-gray-200"></div>
            <img
              src="/images/mplogo1.png"
              alt="Mercado Pago"
              className="h-10 object-contain opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>

          {/* Texto de seguridad */}
          <p className="text-center text-xs text-gray-400 mt-3">
            🔐 Pago seguro y encriptado
          </p>
        </div>
      </div>
    </div>
  );
}

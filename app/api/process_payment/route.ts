// app/api/process_payment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';

// Inicializa el cliente de MercadoPago
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || '',
  options: { timeout: 5000 },
});

const payment = new Payment(client);

// Tipos auxiliares
interface PaymentBody {
  token: string;
  transaction_amount: number;
  payment_method_id: string;
  description?: string;
  installments?: number;
  issuer_id?: string;
  payer: {
    email: string;
    identification: {
      type: string;
      number: string;
    };
  };
  userId?: string;
  movieId?: string;
}

interface MercadoPagoError {
  cause?:
    | { description?: string; message?: string }[]
    | { description?: string; message?: string };
  message?: string;
}

/* Tipo de cambio interno USD a PEN */
const USD_EXCHANGE_RATE = Number(process.env.USD_EXCHANGE_RATE || 3.7);

/* Convierte USD a PEN */
const convertUsdToPen = (usdAmount: number): number => {
  return Number((usdAmount * USD_EXCHANGE_RATE).toFixed(2));
};

export async function POST(request: NextRequest) {
  try {
    const body: PaymentBody = await request.json();

    console.log('📥 Recibiendo solicitud de pago:', {
      amount: body.transaction_amount,
      payment_method: body.payment_method_id,
    });

    // Validar datos requeridos
    if (!body.token || !body.transaction_amount || !body.payment_method_id) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos' },
        { status: 400 },
      );
    }

    const originalUsdAmount = Number(body.transaction_amount);
    const penAmount = convertUsdToPen(originalUsdAmount);

    const installmentsParsed = body.installments
      ? Number(body.installments)
      : 1;

    // Crear el pago
    const paymentData = {
      transaction_amount: penAmount,
      token: body.token,
      description: body.description || 'Donación',
      installments: installmentsParsed,
      payment_method_id: body.payment_method_id,
      issuer_id: body.issuer_id ? Number(body.issuer_id) : undefined,
      payer: {
        email: body.payer.email,
        identification: {
          type: body.payer.identification.type,
          number: body.payer.identification.number,
        },
      },
      external_reference: `order_${Date.now()}`,
      statement_descriptor: 'DONACION-ONLINE',
    };

    // Ejecutar el pago
    console.log('💳 Procesando pago con MercadoPago...');
    const result = await payment.create({ body: paymentData });

    console.log('✅ Resultado del pago:', {
      status: result.status,
      id: result.id,
    });

    return NextResponse.json({
      status: result.status,
      status_detail: result.status_detail,
      id: result.id,
      transaction_amount: result.transaction_amount,
      payment_method_id: result.payment_method_id,
      installments: result.installments,
      external_reference: result.external_reference,
    });
  } catch (error: unknown) {
    console.error('❌ Error procesando pago:', error);

    // Detectamos estructura de error de Mercado Pago
    const err = error as MercadoPagoError;
    const cause = Array.isArray(err.cause) ? err.cause[0] : err.cause;
    const details = cause?.description || cause?.message || err.message;

    if (details) {
      return NextResponse.json(
        { error: 'Error al procesar el pago', details },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 },
    );
  }
}

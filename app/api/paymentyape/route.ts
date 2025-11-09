import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';

// ⚙️ Token privado desde variables de entorno (.env.local)
const ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN || '';

// Inicializamos el cliente con el access token
const client = new MercadoPagoConfig({ accessToken: ACCESS_TOKEN });

// Definimos tipo para la respuesta esperada de Mercado Pago
type MercadoPagoResponse = {
  id: string;
  status: string;
  status_detail?: string;
  [key: string]: unknown;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validamos campos necesarios
    if (!body.transaction_amount || !body.token || !body.payer?.email) {
      return NextResponse.json(
        { error_message: 'Faltan datos requeridos para procesar el pago' },
        { status: 400 },
      );
    }

    // Creamos la instancia de pago
    const payment = new Payment(client);

    // Datos del pago
    const paymentData = {
      transaction_amount: Number(body.transaction_amount),
      token: body.token,
      description: body.description || 'Pago con Yape',
      installments: Number(body.installments) || 1,
      payment_method_id: 'yape',
      payer: { email: body.payer.email },
    };

    // Llamada al endpoint de MercadoPago para crear el pago
    const result = await payment.create({
      body: paymentData,
      requestOptions: {
        idempotencyKey: `yape_${Date.now()}`, // Evita pagos duplicados
      },
    });

    // Obtenemos respuesta (varía según versión del SDK)
    const resultTyped = result as {
      response?: MercadoPagoResponse;
      body?: MercadoPagoResponse;
    };
    const resp: MercadoPagoResponse =
      resultTyped.response ||
      resultTyped.body ||
      (result as unknown as MercadoPagoResponse);

    console.log('Pago con Yape completado:', resp);

    return NextResponse.json(
      {
        id: resp.id,
        status: resp.status,
        detail: resp.status_detail,
        message: 'Pago procesado correctamente',
      },
      { status: 201 },
    );
  } catch (err: unknown) {
    console.error('Error al procesar el pago con Yape:', err);

    let message = 'Error procesando el pago';
    if (err instanceof Error) {
      message = err.message;
    } else if (typeof err === 'object' && err && 'cause' in err) {
      const cause = (err as { cause?: { description?: string }[] }).cause;
      message = cause?.[0]?.description || message;
    }

    return NextResponse.json({ error_message: message }, { status: 400 });
  }
}

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log('📩 Webhook recibido:', JSON.stringify(body, null, 2));

    // Mercado Pago envía varios tipos de notificaciones
    // El más importante en pagos es:
    // body.type === "payment"
    // body.data.id === ID del pago

    // Aquí puedes procesar el pago:
    // - guardar en DB
    // - actualizar estado
    // - enviar correo
    // - desbloquear contenido

    return NextResponse.json({ received: true });
  } catch (e) {
    console.error('❌ Error en webhook:', e);
    return NextResponse.json({ error: true }, { status: 500 });
  }
}

// IMPORTANTE — Mercado Pago manda GET para verificar disponibilidad
export async function GET() {
  return NextResponse.json({ ping: 'ok' });
}

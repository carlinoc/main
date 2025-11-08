// app/api/process_payment/route.ts
import { NextRequest, NextResponse } from "next/server";

// Instala el SDK: npm install mercadopago
import { MercadoPagoConfig, Payment } from "mercadopago";

// Inicializa el cliente de MercadoPago
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || "",
  options: {
    timeout: 5000,
  },
});

const payment = new Payment(client);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("📥 Recibiendo solicitud de pago:", {
      amount: body.transaction_amount,
      payment_method: body.payment_method_id,
    });

    // Validar datos requeridos
    if (!body.token || !body.transaction_amount || !body.payment_method_id) {
      return NextResponse.json(
        { error: "Faltan datos requeridos" },
        { status: 400 }
      );
    }

    // Crear el pago
    const paymentData = {
      transaction_amount: body.transaction_amount,
      token: body.token,
      description: body.description || "Compra en tienda",
      installments: body.installments || 1,
      payment_method_id: body.payment_method_id,
      issuer_id: body.issuer_id,
      payer: {
        email: body.payer.email,
        identification: {
          type: body.payer.identification.type,
          number: body.payer.identification.number,
        },
      },
      // Referencia externa para identificar el pago
      external_reference: `order_${Date.now()}`,
      // Descriptor que aparecerá en el estado de cuenta
      statement_descriptor: "MI TIENDA",
    };

    // Ejecutar el pago
    console.log("💳 Procesando pago con MercadoPago...");
    const result = await payment.create({ body: paymentData });

    console.log("✅ Resultado del pago:", {
      status: result.status,
      id: result.id,
    });

    // Si el pago fue aprobado, agregar película a la lista del usuario
    if (result.status === "approved" && body.movieId && body.userId) {
      try {
        // Aquí llamas a tu función para agregar la película a la lista del usuario
        // Ejemplo: await addMovieToUserList(body.userId, body.movieId);
        console.log("📽️ Agregando película al usuario:", {
          userId: body.userId,
          movieId: body.movieId,
        });
        
        // IMPORTANTE: Implementa esta función según tu base de datos
        // await addMovieToUserList({
        //   userId: body.userId,
        //   movieId: body.movieId,
        //   amount: body.transaction_amount,
        // });
      } catch (error) {
        console.error("Error agregando película al usuario:", error);
        // El pago se procesó pero hubo error guardando en BD
        // Podrías enviar una notificación al admin
      }
    }

    // Manejar respuesta según el estado
    return NextResponse.json({
      status: result.status,
      status_detail: result.status_detail,
      id: result.id,
      transaction_amount: result.transaction_amount,
      payment_method_id: result.payment_method_id,
      installments: result.installments,
      external_reference: result.external_reference,
    });
  } catch (error: any) {
    console.error("❌ Error procesando pago:", error);

    // Manejo de errores detallado
    if (error.cause) {
      const errorDetails = Array.isArray(error.cause) ? error.cause[0] : error.cause;
      return NextResponse.json(
        {
          error: "Error al procesar el pago",
          details: errorDetails.description || errorDetails.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
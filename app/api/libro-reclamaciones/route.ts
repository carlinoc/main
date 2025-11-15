import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // URL de tu API backend real (3001)
    const url = `${process.env.NEXT_PUBLIC_API_URL}api/libro-reclamaciones`;

    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });

    // Si la API respondió con error
    if (!apiResponse.ok) {
      const errorDetails = await apiResponse.text();
      return NextResponse.json(
        {
          error: 'Error al comunicarse con el API real',
          details: errorDetails,
        },
        { status: apiResponse.status },
      );
    }

    const result = await apiResponse.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      {
        error: 'Error interno en el proxy',
        details: error?.message,
      },
      { status: 500 },
    );
  }
}

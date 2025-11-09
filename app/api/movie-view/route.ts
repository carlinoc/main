import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Reenvías la solicitud al backend real
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/movie-view`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        cache: 'no-store',
      },
    );

    //  Parseas la respuesta y la devuelves al frontend
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Error proxying request' },
      { status: 500 },
    );
  }
}

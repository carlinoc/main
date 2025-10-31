// app/lib/data/saveMoviePay.ts
export interface MoviePaymentData {
  clientId: string;
  movieId: string;
  transactionId: string;
  amount: number;
}

export interface ApiResponse {
  success?: boolean;
  message?: string;
  data?: any;
}

export async function saveMoviePay(
  transactionId: string,
  clientId: string,
  movieId: string,
  amount: number
): Promise<ApiResponse> {
  try {
    const data: MoviePaymentData = {
      clientId,
      movieId,
      transactionId,
      amount,
    };

    const response = await fetch( '/api/save-movie', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const result: ApiResponse = await response.json();
    return result;
  } catch (error) {
    console.error('Error guardando el pago de la película:', error);
    throw new Error('Error guardando el pago de la película');
  }
}

import type { NextApiRequest, NextApiResponse } from 'next';

interface PaymentData {
  token: string;
  transaction_amount: number;
  installments: number;
  payment_method_id: string;
  payer: {
    email: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const data: PaymentData = req.body;

    const mpResponse = await fetch('https://api.mercadopago.com/v1/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`, 
      },
      body: JSON.stringify({
        token: data.token,
        transaction_amount: data.transaction_amount,
        payment_method_id: data.payment_method_id,
        installments: data.installments,
        payer: {
          email: data.payer.email,
        },
      }),
    });

    const result = await mpResponse.json();

    if (mpResponse.ok) {
      res.status(200).json(result);
    } else {
      res.status(400).json({ error_message: result.message || 'Payment failed', result });
    }
  } catch (err: any) {
    res.status(500).json({ error_message: err.message });
  }
}
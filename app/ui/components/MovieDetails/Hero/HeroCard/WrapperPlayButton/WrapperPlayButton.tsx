'use client';
import React, { useEffect, useState } from 'react';
import { PlayButton } from '../PlayButton';
import { YapeForm } from '@/app/ui/components/pay/YapeForm';
import PaymentModal from '@/app/ui/components/pay/PaymentModal';
import { fetchUserData } from '@/app/lib/data/fetch';
import { useSession } from 'next-auth/react';
import { WrapperPlayButtonProps } from '../HeroCard.model';
import { useCountry } from '@/app/context/CountryContext';

export default function WrapperPlayButton({
  movieData,
  handlePaid,
}: WrapperPlayButtonProps): JSX.Element {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;
  const [alertMsg, setAlertMsg] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'error' | null>(null);
  const [userMovieList, setUserMovieList] = useState<MovieUserList[]>();
  const [showYape, setShowYape] = useState(false);
  const [showCardPayment, setShowCardPayment] = useState(false);

  // Usar el contexto de país
  const { countryCode, isLoading: isDetectingCountry } = useCountry();

  // Loading state for fetching data
  const [isLoading, setIsLoading] = useState(false);
  // State to store user information
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (userMovieList) {
      const movie = userMovieList.find((movie) => movie.id === movieData.id);
      if (movie) {
        handlePaid();
      }
    }
  }, [userMovieList]);

  // useEffect to fetch movie list when component mounts or myListState/userEmail changes
  useEffect(() => {
    let didFetch = false;

    const fetchMovieList = async () => {
      if (status !== 'authenticated' || !session?.user?.email) return;
      if (didFetch || !userEmail) return;
      didFetch = true;

      try {
        setIsLoading(true);
        const userDataResponse = await fetchUserData({ email: userEmail });
        const userData = userDataResponse.data[0];
        if (userData) {
          setUserInfo(userData);
          setUserMovieList(userData.movies || []);
        }
      } catch (error) {
        console.error('Error fetching movie list:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieList();
  }, [status, session?.user?.email, alertMsg]);

  const handleSuccess = () => {
    handlePaid();
  };

  const COUNTRY_DEFAULT = process.env.NEXT_PUBLIC_COUNTRY_DEFAULT;
  // Decidir qué modal mostrar según el país
  const handlePayClick = () => {
    if (isDetectingCountry) {
      // Esperar a que termine la detección
      return;
    }

    if (countryCode === COUNTRY_DEFAULT) {
      // Usuario de Perú -> Mostrar Yape
      console.log('🇵🇪 Usuario de Perú, mostrando Yape');
      setShowYape(true);
    } else {
      // Usuario internacional -> Mostrar pago con tarjeta
      console.log(
        `🌍 Usuario internacional (${countryCode}), mostrando pago con tarjeta`,
      );
      setShowCardPayment(true);
    }
  };

  return (
    <div className="relative flex flex-col items-center gap-4">
      {/* Botón principal para reproducir el video */}
      <PlayButton
        movieData={movieData}
        userMovieList={userMovieList}
        isLoading={isLoading || isDetectingCountry}
        handlePay={handlePayClick}
      />

      {/* Modal de donación Yape (solo Perú) */}
      <YapeForm
        isOpen={showYape}
        onClose={() => {
          setShowYape(false);
        }}
        movieId={String(movieData.id)}
        minAmount={Number(movieData.price)}
        userEmail={userEmail || ''}
        userId={userInfo?.id || ''}
        countryCode={countryCode || COUNTRY_DEFAULT || 'PE'}
        onSuccess={(msg) => {
          setAlertMsg(msg);
          setAlertType('success');
          setShowYape(false);
          handleSuccess();
        }}
        onError={(msg) => {
          setAlertMsg(msg);
          setAlertType('error');
        }}
      />

      {/* Modal de pago con tarjeta (internacional) */}
      <PaymentModal
        show={showCardPayment}
        onClose={() => setShowCardPayment(false)}
        amount={Number(movieData.priceUSD)}
        movieId={String(movieData.id)}
        userEmail={userEmail || ''}
        userId={userInfo?.id || ''}
        countryCode={countryCode || COUNTRY_DEFAULT || 'PE'}
        onSuccess={(msg) => {
          setAlertMsg(msg);
          setAlertType('success');
          setShowCardPayment(false);
          handleSuccess();
        }}
        onError={(msg) => {
          setAlertMsg(msg);
          setAlertType('error');
        }}
      />

      {/* Alerta de pago */}
      {alertMsg && (
        <div
          className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md text-center px-4 py-3 rounded-lg shadow-lg z-50 ${
            alertType === 'success'
              ? 'bg-green-100 text-green-700 border border-green-400'
              : 'bg-red-100 text-red-700 border border-red-400'
          }`}
        >
          {alertMsg}
        </div>
      )}
    </div>
  );
}

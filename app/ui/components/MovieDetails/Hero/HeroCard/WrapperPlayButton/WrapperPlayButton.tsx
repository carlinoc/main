'use client';
import React, {useEffect, useState } from 'react';
import { PlayButton } from '../PlayButton';
import { YapeForm } from '@/app/ui/components/pay/YapeForm';
import { fetchUserData } from '@/app/lib/data/fetch';
import { useSession } from 'next-auth/react';
import { WrapperPlayButtonProps } from '../HeroCard.model';

export default function WrapperPlayButton({ movieData, handlePaid }: WrapperPlayButtonProps): JSX.Element {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;
  const [alertMsg, setAlertMsg] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'error' | null>(null);
  const [userMovieList, setUserMovieList] = useState<MovieUserList[]>();
  const [showYape, setShowYape] = useState(false);
  
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
      if (status !== "authenticated" || !session?.user?.email) return;
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
  }, [status, session?.user?.email, alertMsg]); // Dependency array to re-run effect when these values change

  const handleSuccess = () => {
    handlePaid();
  }

  return (
    <div className="relative flex flex-col items-center gap-4">
      {/* Botón principal */}
      <PlayButton
        movieData={movieData}
        userMovieList={userMovieList}
        isLoading={isLoading}
        handlePay={() => setShowYape(true)}
      />

      {/* Modal de donación Yape */}
      <YapeForm
        isOpen={showYape}
        onClose={() => {
          setShowYape(false);
        }}
        movieId={String(movieData.id)}
        minAmount={Number(movieData.price)}
        userEmail={userEmail || ''}
        userId={userInfo?.id || ''}
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

      {/* Alerta */}
      {alertMsg && (
        <div
          className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md text-center px-4 py-3 rounded-lg shadow-lg ${
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
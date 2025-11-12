'use client';
import {
  useState,
  MouseEvent,
  TouchEvent,
  KeyboardEvent,
  useEffect,
} from 'react';
import { VideoPlayerModal } from '@/app/ui/components/shared/Modals/VideoPlayerModal';
import { VideoPlayer } from '@/app/ui/components/shared/VideoPlayer';
import { convertMinutesToHours } from '@/app/lib/utils/convertMinutesToHours';
import { extractValuesByKey } from '@/app/lib/utils/extractValuesByKey';
import { InfoSectionProps } from '../HeroCard.model';

export function InfoSection({ movieData }: InfoSectionProps): JSX.Element {
  const {
    name,
    description,
    whySee,
    duration,
    trailer,
    languages,
    genres,
    director,
    release_year,
    category,
    country,
  } = movieData;

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [date, setDate] = useState<number>(0);

  // 🔹 Estados para expandir texto con animación
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);
  const [showFullWhySee, setShowFullWhySee] = useState(false);

  useEffect(() => {
    const year = new Date(release_year).getFullYear();
    return setDate(year);
  }, [release_year]);

  const genreList = genres.join(', ');
  const languagesList = extractValuesByKey({ array: languages, key: 'name' });
  const directorList = director
    .map((item: DirectorAPI) => `${item?.firstName} ${item?.lastName}`)
    .join(', ');
  const countryMovie = country[0]?.name;

  const detailsMovieList = [
    {
      name: 'type',
      data: 'Película',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-device-tv"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
          <path d="M16 3l-4 4l-4 -4" />
        </svg>
      ),
    },
    {
      name: 'runtime',
      data: convertMinutesToHours(duration),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-clock"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
          <path d="M12 7v5l3 3" />
        </svg>
      ),
    },
    {
      name: 'release_date',
      data: date,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-calendar-event"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
          <path d="M16 3l0 4" />
          <path d="M8 3l0 4" />
          <path d="M4 11l16 0" />
          <path d="M8 15h2v2h-2z" />
        </svg>
      ),
    },
    {
      name: 'spoken_lenguages',
      data: languagesList,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-volume"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 8a5 5 0 0 1 0 8" />
          <path d="M17.7 5a9 9 0 0 1 0 14" />
          <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
        </svg>
      ),
    },
  ];

  const handleOpenModal = (e: MouseEvent | TouchEvent | KeyboardEvent) => {
    e.preventDefault();
    setOpenModal(true);
  };

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        <section className="col-span-1 flex flex-col gap-4 w-full h-full">
          <article className="flex flex-col justify-center gap-2 w-full h-auto text-textColorNeutral-50">
            <div className="w-full leading-4">
              <h1 className="heading-5 font-extrabold">{name}</h1>
              <span className="span-xs px-1.5 py-0.5 mb-4 rounded-r-full bg-primary-600 text-textColorNeutral-50 font-medium">
                {category}
              </span>
              <span className="inline-block w-full pt-2 span-xs font-semibold">
                Dirigido por:
                <span className="font-normal">{` ${directorList}`}</span>
              </span>
            </div>
            <span className="span-sm font-medium text-customNeutral-300">
              {genreList}
            </span>
            <span className="inline-block w-full span-xs font-semibold">
              País:
              <span className="font-normal">{` ${countryMovie}`}</span>
            </span>
            <div className="flex items-center gap-2 flex-wrap w-full pb-4 border-b border-borderNeutral-50/50 span-sm text-textColorNeutral-300 font-medium">
              {detailsMovieList.map((item) => (
                <span
                  key={`detail-${item?.name}`}
                  className="flex justify-center items-center gap-1 text-nowrap"
                >
                  {item?.icon}
                  {item?.data}
                </span>
              ))}
            </div>
          </article>

          {trailer ? (
            <article className="flex flex-col md:flex-row gap-4 w-full">
              <button
                type="button"
                className="button-outlined padding-button w-full md:w-fit"
                onClick={(e) => handleOpenModal(e)}
              >
                Ver Trailer
              </button>
            </article>
          ) : null}
        </section>

        <section className="hidden col-span-1 lg:col-span-2 self-end md:grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {/* SINOPSIS */}
          <article className="md:col-span-1 lg:col-span-1 w-full">
            <span className="span-base font-semibold text-textColorNeutral-50">
              Sinopsis
            </span>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                showFullSynopsis ? 'max-h-[1000px]' : 'max-h-[140px]'
              }`}
            >
              <p className="paragraph-sm font-normal text-textColorNeutral-100">
                {description || ''}
              </p>
            </div>

            {description && description.length > 420 && (
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => setShowFullSynopsis(!showFullSynopsis)}
                  className={`px-3 py-1 border rounded-lg text-xs font-medium transition-all duration-200 ${
                    showFullSynopsis
                      ? 'border-secondary-600 text-secondary-400 hover:bg-secondary-600 hover:text-white'
                      : 'border-secondary-600 text-secondary-500 hover:bg-secondary-600 hover:text-white'
                  }`}
                >
                  {showFullSynopsis ? 'Ver menos' : 'Ver más'}
                </button>
              </div>
            )}
          </article>

          {/* POR QUÉ VERLA */}
          <article className="md:col-span-1 lg:col-span-1 w-full">
            <span className="span-base font-semibold text-textColorNeutral-50">
              Por qué verla
            </span>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                showFullWhySee ? 'max-h-[1000px]' : 'max-h-[140px]'
              }`}
            >
              <p className="paragraph-sm font-normal text-textColorNeutral-100">
                {whySee || ''}
              </p>
            </div>

            {whySee && whySee.length > 420 && (
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => setShowFullWhySee(!showFullWhySee)}
                  className={`px-3 py-1 border rounded-lg text-xs font-medium transition-all duration-200 ${
                    showFullWhySee
                      ? 'border-secondary-600 text-secondary-400 hover:bg-secondary-600 hover:text-white'
                      : 'border-secondary-600 text-secondary-500 hover:bg-secondary-600 hover:text-white'
                  }`}
                >
                  {showFullWhySee ? 'Ver menos' : 'Ver más'}
                </button>
              </div>
            )}
          </article>
        </section>
      </section>

      {openModal ? (
        <VideoPlayerModal
          openModalState={openModal}
          handleOpenModal={setOpenModal}
        >
          <VideoPlayer
            src={`https://www.youtube.com/embed/${trailer}`}
            title="Video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </VideoPlayerModal>
      ) : null}
    </>
  );
}

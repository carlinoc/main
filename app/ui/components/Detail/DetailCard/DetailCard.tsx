import { CDN_IMAGES_BASE_URL } from '@/app/lib/data/urls';
import { DetailCardProps } from './DetailCard.model';
import { InfoSection } from '../../MovieDetails/Hero/HeroCard/InfoSection';
import { PlayVideo } from './PlayVideo';

export function DetailCard({ movieData }: DetailCardProps): JSX.Element {
    const { description, whySee, image2, price, payment_type, urlId } = movieData;

    const pathBackground = urlId==null ? "" : `${CDN_IMAGES_BASE_URL}`;
    const backgroundImage = `${pathBackground}${image2}`;
    
    return (
        <>
            <section
            className="relative overflow-hidden w-full min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: `url('${backgroundImage}')`,
            }}
            >
                <article className="w-full min-h-screen flex justify-center items-center bg-gradient-to-t from-bgPrimaryDark/80 via-bgPrimaryDark/10 to-transparent">
                    <div className="grid auto-cols-fr justify-items-center items-end gap-16 w-11/12 min-h-screen py-16 lg:pt-[4.5rem] lg:pb-9">
                        <div className="z-[10] w-fit h-fit">
                            <PlayVideo movieData={movieData} />
                        </div>
                        <InfoSection movieData={movieData} />
                    </div>
                </article>
            </section>
        </>
    );
}
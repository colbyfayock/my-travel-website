import { redirect } from 'next/navigation';
import { getCldImageUrl } from 'next-cloudinary';

import Container from '@/components/Container';

import destinations from '@/data/destinations.json';

export default async function Destination({ params }: { params: { destinationId: string; }}) {
  const destination = destinations.find(({ id }) => id === params.destinationId);

  if ( !destination ) {
    redirect('/404');
  }

  return (
    <>
      <Container className="relative flex max-w-7xl items-center justify-center aspect-[3/1] bg-black">
        <span className="block absolute top-0 left-0 right-0 bottom-0 z-0 opacity-70 m-auto w-full h-full bg-no-repeat bg-center bg-cover" style={{
          backgroundImage: `url(${getCldImageUrl({
            src: destination.image.publicId,
            width: 2560,
            height: 854,
            crop: 'fill'
          })})`
        }} />
        <h1 className="relative z-10 text-white text-7xl uppercase font-black">{ destination.title }</h1>
      </Container>
      <Container className="mt-12">
        <div className="prose-lg mx-auto">
          <h2>About { destination.title }</h2>
          <p>{ destination.description }</p>
        </div>
      </Container>
      <Container className="mt-12">
        <video
          className="mx-auto"
          width="640"
          height="360"
          src="/videos/beach_-_78287 (1080p).mp4"
          controls
        />
      </Container>
      <Container className="mt-12">
        <div className="prose-lg mx-auto">
          <div className="flex justify-between items-center">
            <h2>Traveler&apos;s Photos</h2>
          </div>
          <ul className="grid grid-cols-4 gap-2 p-0">
            <li className="m-0 p-0">
              <img
                className="m-0"
                src={destination.image.url}
                width={destination.image.width}
                height={destination.image.height}
                alt=""
              />
            </li>
          </ul>
        </div>
      </Container>
    </>
  )
}
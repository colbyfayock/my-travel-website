import { redirect } from 'next/navigation';
import { getCldImageUrl } from 'next-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

import Container from '@/components/Container';
import CldVideoPlayer from '@/components/CldVideoPlayer';
import CldUploadButton from '@/components/CldUploadButton';
import CldImage from '@/components/CldImage';

import destinations from '@/data/destinations.json';

import 'next-cloudinary/dist/cld-video-player.css';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function Destination({ params }: { params: { destinationId: string; }}) {
  const destination = destinations.find(({ id }) => id === params.destinationId);

  if ( !destination ) {
    redirect('/404');
  }

  const results = await cloudinary.search.expression(`folder=my-travel-website/uploads AND tags=destination-${destination.id}`).with_field('context').execute();
  const { resources: travelerPhotos } = results || {};

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
      {destination.video && (
        <Container className="mt-12">
          <CldVideoPlayer
            id="destination-video"
            className="mx-auto"
            width="640"
            height="360"
            src={destination.video.publicId}
            transformation={{
              streaming_profile: 'hd',
            }}
            sourceTypes={['hls']}
            controls
          />
        </Container>
      )}
      <Container className="mt-12">
        <div className="prose-lg mx-auto">
          <div className="flex justify-between items-center">
            <h2>Traveler&apos;s Photos</h2>
            <CldUploadButton
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              uploadPreset="my-travel-website"
              signatureEndpoint="/api/sign-cloudinary-params"
              options={{
                tags: ['traveler-photo', `destination-${destination.id}`],
              }}
            >
              Add a Photo
            </CldUploadButton>
          </div>
          <ul className="grid grid-cols-4 gap-2 p-0">
            {travelerPhotos.map((photo: { public_id: string; }) => {
              return (
                <li className="m-0 p-0">
                  <CldImage
                    className="m-0"
                    src={photo.public_id}
                    width={526}
                    height={526}
                    crop="fill"
                    alt=""
                  />
                </li>
              )
            })}
          </ul>
        </div>
      </Container>
    </>
  )
}
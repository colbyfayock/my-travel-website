import Link from 'next/link';

import Container from '@/components/Container';

import destinations from '@/data/destinations.json';

export default function Home() {
  return (
    <Container className="max-w-7xl">
      <h2 className="sr-only">Destinations</h2>
      <ul className="grid grid-cols-2 lg:grid-cols-3 gap-2">
        {destinations.map(destination => {
          return (
            <li key={destination.id}>
              <Link className="relative group" href={`/destinations/${destination.id}`}>
                <img
                  src={destination.image.url}
                  width={730}
                  height={900}
                  alt={destination.image.alt}
                />
                <div className="lg:opacity-0 lg:group-hover:opacity-100 transition-opacity absolute bottom-0 left-0 w-full bg-gradient-to-t from-zinc-900 px-5 py-4">
                  <h3 className="text-white text-3xl lg:translate-y-2 lg:group-hover:translate-y-0 transition-transform">
                    { destination.title }
                  </h3>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </Container>
  )
}
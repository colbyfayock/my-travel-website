import Container from '@/components/Container';

const Footer = () => {
  return (
    <footer className="mt-20">
      <Container>
        <p className="text-center text-slate-400 border-t-2 p-6">
          Built with <a className="underline font-medium text-inherit" href="https://nextjs.org/">Next.js</a>.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
import Connect from './_sections/connect';
import Hero from './_sections/hero';
import TrustedBy from './_sections/trusted-by';
import Work from './_sections/work';

const Home = async () => (
  <div className='flex flex-col gap-12 md:gap-24'>
    <Hero />
    <TrustedBy />
    <Work />
    <Connect />
  </div>
);

export default Home;

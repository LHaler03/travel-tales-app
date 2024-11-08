import { Logo } from '../components/Logo/Logo';
import { Navbar } from '../components/Navbar/Navbar';
import { Card } from '../components/Card/Card';
import { Map } from '../components/Map/Map';

function Home() {
  return (
    <>
      <Navbar />
      <Logo />
      <Map />
      <Card />
    </>
  );
}

export default Home;
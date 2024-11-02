import { Logo } from '../components/Logo/Logo';
import { Navbar } from '../components/Navbar/Navbar';
import { Card } from '../components/Card/Card';
function Home() {
  return (
    <>
      <Navbar />
      <Logo />
      <Card />
    </>
  );
}

export default Home;
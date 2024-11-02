import { Logo } from './components/Logo/Logo';
import { Navbar } from './components/Navbar/Navbar';
import { GlobalStyles } from './styles/GlobalStyles';
import { Card } from './components/Card/Card';
function App() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <Logo />
      <Card />
    </>
  );
}

export default App;

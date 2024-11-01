import { Logo } from './components/Logo/Logo';
import { Navbar } from './components/Navbar/Navbar';
import { GlobalStyles } from './styles/GlobalStyles';

function App() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <Logo />
    </>
  );
}

export default App;

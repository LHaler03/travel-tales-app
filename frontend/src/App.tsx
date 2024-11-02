import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { GlobalStyles } from './styles/GlobalStyles';
function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

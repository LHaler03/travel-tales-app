import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles';
import Home from './pages/Home';
import Register_Login from './pages/Register_Login';
function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register_Login act="register" />} />
          <Route path="/login" element={<Register_Login act="login" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

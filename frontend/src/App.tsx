import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles';
import Home from './pages/Home';
import Register from './pages/RegisterPage';
import Login from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import MapPage from './pages/MapPage';

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/fullmap' element={<MapPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles';
import Home from './pages/Home';
import Register from './pages/RegisterPage';
import Login from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import MapPage from './pages/MapPage';
import SupportPage from './pages/SupportPage';
import AboutUsPage from './pages/AboutUsPage';
import ExplorePage from './pages/ExplorePage';
import { Navbar } from './components/Navbar/Navbar';
import GeneratePage from './pages/GeneratePage';
import GeneratePageVertical from './pages/GeneratePageVertical';
import Generate1ImagePage from './pages/Generate1ImagePage';
import Generate1VerticalPage from './pages/Generate1VerticalPage';
function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <GlobalStyles />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route index element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/fullmap' element={<MapPage />} />
            <Route path='/support' element={<SupportPage />} />
            <Route path='/about' element={<AboutUsPage />} />
            <Route path='/explore' element={<ExplorePage />} />
            <Route path='/generate' element={<GeneratePage />} />
            <Route path='/generatevertical' element={<GeneratePageVertical />} />
            <Route path='/generate1' element={<Generate1ImagePage />} />
            <Route path='/generate1vertical' element={<Generate1VerticalPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;

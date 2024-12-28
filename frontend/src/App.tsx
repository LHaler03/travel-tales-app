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
import ImageReviewPage from './pages/ImageReviewPage';
import UsersReviewPage from './pages/UsersReviewPage';
import { Navbar } from './components/Navbar/Navbar';
import GeneratePage from './pages/GeneratePage';
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
            <Route path='/image-review' element={<ImageReviewPage />} />
            <Route path='/users-review' element={<UsersReviewPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;

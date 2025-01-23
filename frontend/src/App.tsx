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
import ReviewsPage from './pages/ReviewsPage';
import GeneratePageVertical from './pages/GeneratePageVertical';
import Generate1ImagePage from './pages/Generate1ImagePage';
import Generate1VerticalPage from './pages/Generate1VerticalPage';
import SingleUserPage from './pages/SingleUserPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ProtectedAdminRoute from './components/ProtectedAdminRoute/ProtectedAdminRoute';
import AddLocationPage from './pages/AddLocationPage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AdminDashboard } from './components/AdminWeb/AdminDashboard';

function App() {
  const [imagesAwaitingReview, setImagesAwaitingReview] = useState<number>(0);

  useEffect(() => {
    const getImagesAwaitingReview = async () => {
      const response = await axios.get(
        `http://${import.meta.env.VITE_TRAVEL_TALES_API}/api/s3/images-to-review-count`,
      );
      setImagesAwaitingReview(response.data.count);
    };

    getImagesAwaitingReview();
  }, []);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <GlobalStyles />
        <BrowserRouter>
          <Navbar imagesAwaitingReview={imagesAwaitingReview} />
          <Routes>
            <Route index element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/fullmap' element={<MapPage />} />
            <Route path='/support' element={<SupportPage />} />
            <Route path='/termsOfService' element={<TermsOfServicePage />} />
            <Route path='/privacyPolicy' element={<PrivacyPolicyPage />} />
            <Route path='/about' element={<AboutUsPage />} />
            <Route path='/explore' element={<ExplorePage />} />
            <Route path='/generate' element={<GeneratePage />} />
            <Route path='/review' element={<ReviewsPage />} />
            <Route
              path='/adminDashboard'
              element={
                <AdminDashboard imagesAwaitingReview={imagesAwaitingReview} />
              }
            />
            <Route path='/addLocation' element={<AddLocationPage />} />
            <Route
              path='/generatevertical'
              element={<GeneratePageVertical />}
            />
            <Route path='/generate1' element={<Generate1ImagePage />} />
            <Route
              path='/generate1vertical'
              element={<Generate1VerticalPage />}
            />
            <Route path='/single-user-review/:id' element={<SingleUserPage />}>
              <Route path='' element={<SingleUserPage />} />
            </Route>
            <Route path='/image-review' element={<ProtectedAdminRoute />}>
              <Route path='' element={<ImageReviewPage />} />
            </Route>
            <Route path='/users-review' element={<ProtectedAdminRoute />}>
              <Route path='' element={<UsersReviewPage />} />
            </Route>
            <Route
              path='/admin-single-user-review/:id'
              element={<ProtectedAdminRoute />}
            >
              <Route path='' element={<SingleUserPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;

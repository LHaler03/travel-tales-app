import { createContext, useContext, useState, ReactNode, useLayoutEffect } from 'react';
import axios from 'axios';

export type UserType = {
  username: string;
  email?: string;
  picture?: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: UserType | null;
  token: string | null;
  login: (token: string, user: UserType) => void;
  logout: () => void;
  googleLogin: (response: {
    access_token: string;
    userInfo?: {
      given_name?: string;
      family_name?: string;
      email?: string;
      picture?: string;
    };
  }) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

const api = axios.create({
  baseURL: 'http://localhost:5185/api',
  withCredentials: true
});

function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (token: string, user: UserType) => {
    setIsAuthenticated(true);
    setToken(token);
    setUser(user);
  };
  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setUser(null);
  };

  const googleLogin = async (response: {
    access_token: string;
    userInfo?: {
      given_name?: string;
      family_name?: string;
      email?: string;
      picture?: string;
    };
  }) => {
    try {
      const googleLoginUrl = 'http://localhost:5185/api/account/signin-google';
      
      const result = await axios.post(googleLoginUrl, {
        access_token: response.access_token,
        provider: 'google',
        userInfo: response.userInfo
      });

      if (!result.data.token || !result.data.username) {
        throw new Error('Invalid response from server');
      }
  
      const user: UserType = {
        username: result.data.username,
        email: result.data.email,
        picture: result.data.picture,
      };
  
      login(result.data.token, user);
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  };
  
  // Request interceptor - adds token to requests
  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  // Response interceptor - handles token refresh
  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        // Check if error is due to invalid/expired token
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            // Try to get a new token
            const response = await api.post('/account/refresh-token');
            
            if (response.data.token) {
              // Update auth state with new token
              const newToken = response.data.token;
              setToken(newToken);
              
              // Update user info if provided
              if (response.data.username) {
                setUser({
                  username: response.data.username,
                  email: response.data.email,
                  picture: response.data.picture
                });
              }
              
              // Retry the original request with new token
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return api(originalRequest);
            }
          } catch (refreshError) {
            // If refresh fails, log out the user
            logout();
            return Promise.reject(refreshError);
          }
        }
        
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, []);

  // Check authentication status on initial load
  useLayoutEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const response = await api.post('/account/refresh-token');
          if (response.data.token) {
            setToken(response.data.token);
            setUser({
              username: response.data.username,
              email: response.data.email,
              picture: response.data.picture
            });
            setIsAuthenticated(true);
          } else {
            logout();
          }
        } catch (error) {
          logout();
        }
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, token, login, logout, googleLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth, api };

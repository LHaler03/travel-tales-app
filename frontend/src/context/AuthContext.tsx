import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useLayoutEffect,
  useEffect,
} from 'react';
import axios from 'axios';

interface UserType {
  username: string;
  email?: string;
  emailConfirmed: boolean;
  role: string; //admin role
}

interface LoginFormData {
  username: string;
  password: string;
}

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

interface LoginResponse {
  username: string;
  email: string;
  token: string;
  emailConfirmed: boolean;
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: UserType | null;
  token: string | null;
  login: (formData: LoginFormData) => Promise<void>;
  register: (formData: RegisterFormData) => Promise<void>;
  loginWithGoogle: (code: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

const api = axios.create({
  baseURL: 'http://3.74.155.131/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
          try {
            const userResponse = await api.get('/account/me', {
              headers: {
                Authorization: `Bearer ${savedToken}`,
              },
            });

            setIsAuthenticated(true);
            setToken(savedToken);
            setUser(userResponse.data);
            setIsLoading(false);
            return;
          } catch (error) {
            localStorage.removeItem('token');
          }
        }

        const response = await api.get<{ accessToken: string }>(
          '/account/refresh-token',
        );
        if (response.data.accessToken) {
          localStorage.setItem('token', response.data.accessToken);
          const userResponse = await api.get('/account/me', {
            headers: {
              Authorization: `Bearer ${response.data.accessToken}`,
            },
          });

          setIsAuthenticated(true);
          setToken(response.data.accessToken);
          setUser(userResponse.data);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setIsAuthenticated(false);
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (formData: LoginFormData) => {
    try {
      const response = await api.post<LoginResponse>(
        '/account/login',
        formData,
      );

      const user: UserType = {
        username: response.data.username,
        email: response.data.email,
        emailConfirmed: response.data.emailConfirmed,
        role: 'admin', //admin role
      };

      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      setToken(response.data.token);
      setUser(user);
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Incorrect username and/or password!');
    }
  };

  const register = async (formData: RegisterFormData) => {
    try {
      await api.post('/account/register', formData);
      await login({
        username: formData.username,
        password: formData.password,
      });
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Registration failed');
    }
  };

  const loginWithGoogle = async (accessToken: string) => {
    try {
      const response = await api.post<LoginResponse>('/account/google', {
        token: accessToken,
      });

      if (response.data.token) {
        const user: UserType = {
          username: response.data.username,
          email: response.data.email,
          emailConfirmed: response.data.emailConfirmed,
          role: 'admin', //admin role
        };
        localStorage.setItem('token', response.data.token);
        setIsAuthenticated(true);
        setToken(response.data.token);
        setUser(user);
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Google login error:', error);
      localStorage.removeItem('token');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post('/account/logout');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setToken(null);
      setUser(null);
    }
  };

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

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          originalRequest.url === '/account/refresh-token' ||
          originalRequest.url === '/account/me' ||
          originalRequest._retry
        ) {
          return Promise.reject(error);
        }

        if (
          error.response?.status === 403 &&
          error.response.data === 'Unauthorized'
        ) {
          originalRequest._retry = true;

          try {
            const response = await api.get<{ accessToken: string }>(
              '/account/refresh-token',
            );

            if (response.data.accessToken) {
              setToken(response.data.accessToken);
              originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
              return api(originalRequest);
            }
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            setIsAuthenticated(false);
            setToken(null);
            setUser(null);
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        login,
        register,
        loginWithGoogle,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { useAuth, AuthProvider };

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
  baseURL: 'http://localhost:5185/api',
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
        const response = await api.get<{ accessToken: string }>(
          '/account/refresh-token',
        );

        if (response.data.accessToken) {
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
      };

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
        };
        setIsAuthenticated(true);
        setToken(response.data.token);
        setUser(user);
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post('/account/logout');
      setIsAuthenticated(false);
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
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

        if (originalRequest._retry) {
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

import { createContext, useContext, useState, ReactNode } from 'react';
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

export { AuthProvider, useAuth };

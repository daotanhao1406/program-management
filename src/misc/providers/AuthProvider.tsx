import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from 'react';
import { useRequestWithState } from '../../hooks/useRequest';
import { useLocation } from 'react-router-dom';
import { notification } from 'antd';

interface AuthContextType {
  user: any;
  pdfData: any;
  login: (email: string, password: string) => void;
  signUp: (values: any) => void;
  logout: () => void;
  getMe: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { request, loading } = useRequestWithState();
  const location = React.useRef<string>('');
  const [user, setUser] = useState<any>(null);
  const [pdfData, setPDFData] = useState<any>({});
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('is-authenticated')
  );
  const currentLocation = useLocation().pathname;
  if (
    currentLocation === '/login' ||
    currentLocation === '/signup' ||
    currentLocation === '/'
  ) {
    location.current = currentLocation;
  }
  useEffect(() => {
    if (token) getMe();
  }, [token]);

  const login = async (email: string, password: string) => {
    await request('/user/login', {
      method: 'POST',
      data: { email, password },
    })
      .then((res) => {
        setUser(res.data);
        setToken(res.data._id);
        localStorage.setItem('is-authenticated', res.data._id);
      })
      .catch((err) => {
        notification.error({
          message: 'Login failed',
          description: err.response.data.message,
        });
      });
  };

  const logout = () => {
    localStorage.removeItem('is-authenticated');
    setUser(null);
    setToken(null);
  };

  const getMe = () => {
    const currentUserId = localStorage.getItem('is-authenticated');
    request(`/user/${currentUserId}`)
      .then((res) => {
        setUser(res.data);
        if (res.data.pdfData) {
          setPDFData(res.data.pdfData);
        }
      })
      .catch((err) => {
        logout();
      });
  };

  const signUp = async (values: any) => {
    await request('/user/register', {
      method: 'POST',
      data: values,
    })
      .then((res) => {
        setUser(res.data);
        setToken(res.data._id);
        localStorage.setItem('is-authenticated', JSON.stringify(res.data));
      })
      .catch((err) => {
        notification.error({
          message: 'Signup failed',
          description: err.response.data.message,
        });
      });
  };

  const value = { user, pdfData, login, logout, signUp, getMe, loading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

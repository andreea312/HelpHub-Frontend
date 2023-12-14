import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { loginAPI } from '../api/UserAPI';
import { User } from '../shared/Types';


type LoginFn = (email?: string, parola?: string) => void;
type LogoutFn = () => void;

export interface AuthState {
  authenticationError: Error | null;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  login?: LoginFn;
  logout?: LogoutFn;
  pendingAuthentication?: boolean;
  user: User;
}

const InitialUser: User = {
    email: "",
    parola: "",
    fullName: "",
    username: "",
    gender: 0,
    coins: 0,
    level: 0
}

const initialState: AuthState = {
  isAuthenticated: false,
  isAuthenticating: false,
  authenticationError: null,
  pendingAuthentication: false,
  user: InitialUser
};

export const AuthContext = React.createContext<AuthState>(initialState);

interface AuthProviderProps {
  children: PropTypes.ReactNodeLike,
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);
  const { isAuthenticated, isAuthenticating, authenticationError, pendingAuthentication, user } = state;
  const login = useCallback<LoginFn>(loginCallback, []);
  const logout = useCallback<LogoutFn>(logoutCallback, []);

  useEffect(authenticationEffect, [pendingAuthentication]);

  useEffect(() => {
    async function checkForUser() {
      if(isAuthenticated){
        return;
      }

      const userItem = localStorage.getItem('user');

      if(userItem){
        const user: User = JSON.parse(userItem);
        console.log('found user: ', user);
        setState({
          ...state,
             pendingAuthentication: false,
             isAuthenticated: true,
             isAuthenticating: false,
             user: {
              id: user.id,
              email: user.email,
              parola: user.parola,
              fullName: user.fullName,
              username: user.username,
              gender: user.gender,
              coins: user.coins,
              level: user.level
             }
        })
      }
    }
    checkForUser();
}, [state]);
  
  const value = { isAuthenticated, login, logout, isAuthenticating, authenticationError, user };
  console.log('render');
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );

  function loginCallback(email?: string, parola?: string): void {
    console.log('login');

    setState({
      ...state,
      pendingAuthentication: true,
      user : {
        email: email,
        parola: parola
      }
    });
  }

  function logoutCallback(): void {
    console.log('logout');
    localStorage.removeItem('user');
    setState({
        ...state,
        user: InitialUser,
        isAuthenticated: false,
    });
  }

  function authenticationEffect() {
    let canceled = false;
    authenticate();
    return () => {
      canceled = true;
    }

    async function authenticate() {
      if (!pendingAuthentication || user.id) {
        return;
      }
      try {
        console.log('authenticate...');
        setState({
          ...state,
          isAuthenticating: true,
        });
        const { user } = state;
        const loggedUser = await loginAPI(user);
        if (canceled) {
          return;
        }
        console.log('authenticate succeeded');
        
        localStorage.setItem('user', JSON.stringify(loggedUser));
        console.log('logged user: ', loggedUser);

        setState({
          ...state,
          pendingAuthentication: false,
          isAuthenticated: true,
          isAuthenticating: false,
          user: loggedUser
        });
      } catch (error) {
        if (canceled) {
          return;
        }
        console.log('authenticate failed');
        setState({
          ...state,
          authenticationError: error as Error,
          pendingAuthentication: false,
          isAuthenticating: false,
        });
      }
    }
  }
};

import axios from 'axios';
import { Ticket } from '../types';
import { IAuthorizationConfig } from './lib/createAuthorization';

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  dob: string;
  username: string;
  assigned_tickets: Ticket[];
  created_tickets: Ticket[];
}

const apiBaseUrl = 'http://localhost:8000';

const backendLogin = async (userInfo: unknown) => {
  const { data } = await axios.post(`${apiBaseUrl}/token/`, userInfo);

  return data;
};

const backendRefreshToken = async (refresh: unknown) => {
  const { data } = await axios.post(`${apiBaseUrl}/token/refresh/`, {
    refresh,
  });

  return data;
};

export const AUTH_CONFIG: IAuthorizationConfig<User> = {
  apiBaseUrl,
  backendLogin,
  backendRefreshToken,
  getUserURL: `${apiBaseUrl}/member/me/`,
};

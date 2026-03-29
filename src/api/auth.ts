import api from './axios';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const login = async (payload: LoginPayload): Promise<string> => {
  const { data } = await api.post<{ accessToken: string }>('/auth/login', payload);
  return data.accessToken;
};

export const register = async (payload: RegisterPayload): Promise<void> => {
  await api.post('/auth/register', payload);
};

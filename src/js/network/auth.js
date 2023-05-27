import { LOGIN, REGISTER } from '../config';
import { LoginResponse, Response } from '../types';
import { api } from '../utils';

/**
 * Register new user
 * @param {{name: string, email: string, password: string}} param0 Data to register
 * @returns {Promise<{data: Response}> | Promise<Error>} Axios response
 */
export const register = async ({ name, email, password }) =>
  await api.post(REGISTER, { name, email, password });

/**
 * Login user
 * @param {{email: string, password: string}} param0 Data to login
 * @returns {Promise<{data: LoginResponse}> | Promise<Error>} Axios response
 */
export const login = async ({ email, password }) => await api.post(LOGIN, { email, password });

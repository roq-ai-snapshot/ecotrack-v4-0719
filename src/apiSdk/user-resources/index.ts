import axios from 'axios';
import queryString from 'query-string';
import { UserResourceInterface } from 'interfaces/user-resource';
import { GetQueryInterface } from '../../interfaces';

export const getUserResources = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/user-resources${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createUserResource = async (userResource: UserResourceInterface) => {
  const response = await axios.post('/api/user-resources', userResource);
  return response.data;
};

export const updateUserResourceById = async (id: string, userResource: UserResourceInterface) => {
  const response = await axios.put(`/api/user-resources/${id}`, userResource);
  return response.data;
};

export const getUserResourceById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/user-resources/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteUserResourceById = async (id: string) => {
  const response = await axios.delete(`/api/user-resources/${id}`);
  return response.data;
};

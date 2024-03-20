import axios, { AxiosResponse } from 'axios';
import { Interest, OtherUser, PutRelationRequest, PutUserInterestRequest, User, UserInterest } from './types';
import {getToken} from './token'

export const BASE_URL = 'https://158.160.82.168/api';
const REQUEST_TIMEOUT = 5000;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  }
);

export const getUser: () => Promise<AxiosResponse<User, any>> 
  = () => api.get<User>('/profile/');

export const getInterests: () => Promise<AxiosResponse<Interest[], any>> 
  = () => api.get<Interest[]>('/interests/');

export const getUserInterests: () => Promise<AxiosResponse<UserInterest[], any>> 
  = () => api.get<UserInterest[]>('/users/interests/');

export const putUserInterest: (interest: PutUserInterestRequest) => Promise<AxiosResponse> 
  = (interest: PutUserInterestRequest) => api.put('/users/interests/', interest);

export const getSimilarUsers: () => Promise<AxiosResponse<OtherUser[], any>>
  = () => api.get<OtherUser[]>('/list/similar');

export const getPotentialUsers: () => Promise<AxiosResponse<OtherUser[], any>>
  = () => api.get<OtherUser[]>('/list/potential');

export const getChats: () => Promise<AxiosResponse<OtherUser[], any>>
  = () => api.get<OtherUser[]>('/list/chats');

export const putRelationStatus: (r: PutRelationRequest) => Promise<AxiosResponse>
  = (r: PutRelationRequest) => api.put('/list/relation', r)

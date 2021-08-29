import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import * as Constants from "../utils/constants";

const API_URL = Constants.API_URL;

export const createGame = (): Promise<AxiosResponse> => {
  const options: AxiosRequestConfig = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    validateStatus: (status: number) => {
      return status === 201;
    },
  };

  const route = `${API_URL}/games`;
  return axios.post(route, undefined, options);
};

export const getAllGames = (): Promise<AxiosResponse> => {
  const options: AxiosRequestConfig = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    validateStatus: (status: number) => {
      return status === 200;
    },
  };

  const route = `${API_URL}/games`;
  return axios.get(route, options);
};

export const getGameInfos = (gameId: string): Promise<AxiosResponse> => {
  const options: AxiosRequestConfig = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    validateStatus: (status: number) => {
      return status === 200;
    },
  };

  const route = `${API_URL}/games/${gameId}`;
  return axios.get(route, options);
};

export const sendProposition = (gameId: string, proposition: number): Promise<AxiosResponse> => {
  const options: AxiosRequestConfig = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    validateStatus: (status: number) => {
      return status === 200;
    },
  };

  const propositionPayload: any = {
    proposition,
  };

  const route = `${API_URL}/games/${gameId}/proposition`;
  return axios.post(route, propositionPayload, options);
};

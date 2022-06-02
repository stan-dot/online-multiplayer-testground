import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from "axios";

const url: string = 'https://catfact.ninja/fact';

const headers: AxiosRequestHeaders = {
  'Content-type': 'application/json',
  Accept: 'text/plain',
};

const requestConfig: AxiosRequestConfig = { headers: headers };
const requestBody = {};

export async function getCatFact(): Promise<JSON> {
  const data: AxiosResponse = await axios.get(url);
  return data.data;
}
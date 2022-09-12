import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from "axios";
import React from 'react';
import { defaultText } from './defaults';

export default function CatFacts(): JSX.Element {
  const [mainText, setMainText] = React.useState(defaultText.fact);
  const getFacts = () => getCatFact().then(handleIncoming);

  const handleIncoming = (body: any): void => {
    const text: string = body.fact;
    console.log('text:', text);
    setMainText(text);
  };
  return <div>
    <h1> cat facts</h1>
    <button onClick={getFacts}>Find Cat Facts</button>
    {mainText}
  </div>;
}

const url: string = 'https://catfact.ninja/fact';

const headers: AxiosRequestHeaders = {
  'Content-type': 'application/json',
  Accept: 'text/plain',
};

const requestConfig: AxiosRequestConfig = { headers: headers };
const requestBody = {};

async function getCatFact(): Promise<any> {
  const data: AxiosResponse = await axios.get(url);
  return data.data;
}
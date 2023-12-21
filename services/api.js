import axios from 'axios';
import md5 from 'md5';

const API_BASE_URL = 'https://gateway.marvel.com/v1/public';
const MARVEL_PUBLIC_KEY = process.env.MARVEL_PUBLIC_KEY;
const MARVEL_PRIVATE_KEY = process.env.MARVEL_PRIVATE_KEY;
const TIMESTAMP = Date.now();

const generateHash = () => md5(`${TIMESTAMP}${MARVEL_PRIVATE_KEY}${MARVEL_PUBLIC_KEY}`);

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    ts: TIMESTAMP,
    apikey: MARVEL_PUBLIC_KEY,
    hash: generateHash(),
  };
  return config;
});

export default api;

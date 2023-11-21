import axios from 'axios';

export const malApi = axios.create({
  baseURL: 'https://api.myanimelist.net/v2',
  headers: {
    'X-MAL-CLIENT-ID': 'e12d3090b5fc46302965c730c9cf01e0',
  },
});

malApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      throw Error(error.response?.data.message);
    }
    throw error;
  }
);

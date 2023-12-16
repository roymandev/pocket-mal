// Rate-limited client for Jikan API v4 (max 3 requests/second, 60/minute)
import createClient from 'openapi-fetch';

import { paths } from '@/schema';

import { fetchWithLimit } from './fetch';

const rest = createClient<paths>({
  baseUrl: 'https://api.jikan.moe/v4',
  fetch: fetchWithLimit,
});

const GET: typeof rest.GET = async (...props) => {
  const res = await rest.GET(...props);

  if (res.error) {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw res.error;
  }

  return res;
};

export const jikanRest = {
  GET,
};

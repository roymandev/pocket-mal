// Rate-limited client for Jikan API v4 (max 3 requests/second, 60/minute)
import createClient from 'openapi-fetch';

import { paths } from '@/schema';

import { fetchWithLimit } from './fetch';

export const jikanRest = createClient<paths>({
  baseUrl: 'https://api.jikan.moe/v4',
  fetch: fetchWithLimit,
});

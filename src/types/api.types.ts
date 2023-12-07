import { AnimeOrderby } from '@/constant';
import { operations } from '@/schema';

export type JikanBaseResponse<T> = {
  data?: T;
};

export type AnimeSearchParams = Omit<
  NonNullable<operations['getAnimeSearch']['parameters']['query']>,
  'order_by'
> & {
  order_by?: AnimeOrderby;
};

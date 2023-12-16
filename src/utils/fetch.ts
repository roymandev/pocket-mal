const MAX_REQUESTS_PER_SECOND = 3;
const THROTTLE_DELAY_MS = 1000;

// Queue of recent request timestamps (max length = MAX_REQUESTS_PER_SECOND)
const requestQueue: number[] = [];

// Timestamp of the last request
let lastRequestTime = Date.now();

export const fetchWithLimit: typeof fetch = async (input, init) => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;

  // Check if limits are exceeded
  if (
    requestQueue.length >= MAX_REQUESTS_PER_SECOND &&
    timeSinceLastRequest < THROTTLE_DELAY_MS
  ) {
    await new Promise((resolve) => {
      setTimeout(resolve, THROTTLE_DELAY_MS - timeSinceLastRequest); // Wait remaining time
    });
  }

  requestQueue.push(now);
  while (requestQueue.length > MAX_REQUESTS_PER_SECOND) {
    requestQueue.shift();
  }
  lastRequestTime = now;

  return fetch(input as Request, init);
};

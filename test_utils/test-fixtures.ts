import { test as base } from '@playwright/test';
import { HackerNewsAPI } from './api-helper';

export const test = base.extend<{ hackerNewsAPI: HackerNewsAPI }>({
  hackerNewsAPI: async ({ request }, use) => {
    const api = new HackerNewsAPI(request);
    await use(api);
  },
});

export { expect } from '@playwright/test'; 
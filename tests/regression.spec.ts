import { test, expect } from '../test_utils/test-fixtures';
import { HACKER_NEWS_BASE_URL } from '../test_utils/api-helper';

test.describe('HackerNews API Regression Tests', () => {
  test('verify validate story data structure', async ({ hackerNewsAPI }) => {
    const topStory = await hackerNewsAPI.getTopStory();
    expect(topStory).not.toBeNull();
    
    if (topStory) {
      expect(await hackerNewsAPI.validateStoryStructure(topStory)).toBeTruthy();
    }
  });

  test('verify validate comment data structure', async ({ hackerNewsAPI }) => {
    const topStory = await hackerNewsAPI.getTopStory();
    expect(topStory).not.toBeNull();
    
    if (topStory && topStory.kids && topStory.kids.length > 0) {
      const firstComment = await hackerNewsAPI.getFirstComment(topStory.id);
      expect(firstComment).not.toBeNull();
      
      if (firstComment) {
        expect(await hackerNewsAPI.validateCommentStructure(firstComment)).toBeTruthy();
      }
    }
  });

  test('verify all top stories are unique', async ({ hackerNewsAPI }) => {
    const topStories = await hackerNewsAPI.getTopStories();
    expect(await hackerNewsAPI.validateTopStoriesArray(topStories)).toBeTruthy();
    const uniqueIds = new Set(topStories);
    expect(uniqueIds.size).toBe(topStories.length);
  });

  test('verify handle items with missing optional fields', async ({ hackerNewsAPI }) => {
    const topStory = await hackerNewsAPI.getTopStory();
    expect(topStory).not.toBeNull();
    
    if (topStory) {
      expect(await hackerNewsAPI.validateStoryStructure(topStory)).toBeTruthy();
    }
  });

  test('verify handle story without comments gracefully', async ({ hackerNewsAPI }) => {
    const topStories = await hackerNewsAPI.getTopStories();
    let storyWithoutComments = null;
    
    for (const storyId of topStories.slice(0, 10)) {
      const story = await hackerNewsAPI.getItem(storyId);
      if (story && (!story.kids || story.kids.length === 0)) {
        storyWithoutComments = story;
        break;
      }
    }
    
    if (storyWithoutComments) {
      const comment = await hackerNewsAPI.getFirstComment(storyWithoutComments.id);
      expect(comment).toBeNull();
    }
  });

  test('verify handle non-existent item ID', async ({ request }) => {
    const response = await request.get(`${HACKER_NEWS_BASE_URL}/item/99999999999999.json`);
    const data = await response.json();
    expect(response.status()).toBe(200);
    expect(data).toBeNull();
  });

  test('verify handle invalid item ID format', async ({ request }) => {
    const response = await request.get(`${HACKER_NEWS_BASE_URL}/item/abc123.json`);
    const data = await response.json();
    expect(response.status()).toBe(200);
    expect(data).toBeNull();
  });

  test('verify handle negative item ID', async ({ request }) => {
    const response = await request.get(`${HACKER_NEWS_BASE_URL}/item/-1.json`);
    const data = await response.json();
    expect(response.status()).toBe(200);
    expect(data).toBeNull();
  });

  test('verify handle invalid endpoint', async ({ request }) => {
    const response = await request.get(`${HACKER_NEWS_BASE_URL}/invalidendpoint.json`);
    const data = await response.json();
    expect(response.status()).toBe(401);
  });

  test('verify handle wrong HTTP method', async ({ request }) => {
    const response = await request.post(`${HACKER_NEWS_BASE_URL}/topstories.json`);
    const data = await response.json();
    expect(response.status()).toBe(400);
  });

  test('verify handle deleted items', async ({ hackerNewsAPI }) => {
    const topStories = await hackerNewsAPI.getTopStories();
    let deletedItem = null;
    
    for (const storyId of topStories.slice(0, 20)) {
      const story = await hackerNewsAPI.getItem(storyId);
      if (story && story.deleted === true) {
        deletedItem = story;
        break;
      }
    }
    
    if (deletedItem) {
      expect(deletedItem.deleted).toBe(true);
      expect(await hackerNewsAPI.validateStoryStructure(deletedItem)).toBeTruthy();
    }
  });
}); 
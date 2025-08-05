import { test, expect } from '../test_utils/test-fixtures';

test.describe('HackerNews API Sanity Tests', () => {
  test('verify retrieve top stories', async ({ hackerNewsAPI }) => {
    const topStories = await hackerNewsAPI.getTopStories();
    expect(await hackerNewsAPI.validateTopStoriesArray(topStories)).toBeTruthy();
  });

  test('verify retrieve current top story', async ({ hackerNewsAPI }) => {
    const topStory = await hackerNewsAPI.getTopStory();
    expect(topStory).toBeDefined();
    expect(topStory).not.toBeNull();
    expect(await hackerNewsAPI.validateStoryStructure(topStory!)).toBeTruthy();
    expect(topStory!.type).toBe('story');
  });

  test('verify retrieve first comment from top story', async ({ hackerNewsAPI }) => {
    const topStory = await hackerNewsAPI.getTopStory();
    expect(topStory).not.toBeNull();
    
    if (topStory && topStory.kids && topStory.kids.length > 0) {
      const firstComment = await hackerNewsAPI.getFirstComment(topStory.id);
      expect(firstComment).toBeDefined();
      expect(firstComment).not.toBeNull();
      expect(await hackerNewsAPI.validateCommentStructure(firstComment!)).toBeTruthy();
      expect(firstComment!.type).toBe('comment');
    }
  });

  test('verify retrieve specific story by ID', async ({ hackerNewsAPI }) => {
    const topStories = await hackerNewsAPI.getTopStories();
    expect(topStories.length).toBeGreaterThan(0);
    
    const specificStoryId = topStories[1];
    const story = await hackerNewsAPI.getItem(specificStoryId);
    expect(story).toBeDefined();
    expect(story).not.toBeNull();
    expect(await hackerNewsAPI.validateStoryStructure(story!)).toBeTruthy();
    expect(story!.id).toBe(specificStoryId);
  });

  test('verify retrieve specific comment by ID', async ({ hackerNewsAPI }) => {
    const topStory = await hackerNewsAPI.getTopStory();
    expect(topStory).not.toBeNull();
    
    if (topStory && topStory.kids && topStory.kids.length > 0) {
      const specificCommentId = topStory.kids[1] || topStory.kids[0];
      const comment = await hackerNewsAPI.getItem(specificCommentId);
      expect(comment).toBeDefined();
      expect(comment).not.toBeNull();
      expect(await hackerNewsAPI.validateCommentStructure(comment!)).toBeTruthy();
      expect(comment!.id).toBe(specificCommentId);
      expect(comment!.type).toBe('comment');
    }
  });
}); 
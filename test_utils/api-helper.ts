import { APIRequestContext } from '@playwright/test';

export const HACKER_NEWS_BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export interface HackerNewsItem {
  id: number;
  deleted?: boolean;
  type: string;
  by?: string;
  time: number;
  text?: string;
  dead?: boolean;
  parent?: number;
  poll?: number;
  kids?: number[];
  url?: string;
  score?: number;
  title?: string;
  parts?: number[];
  descendants?: number;
}

export class HackerNewsAPI {
  private request: APIRequestContext;
  private baseURL: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseURL = HACKER_NEWS_BASE_URL;
  }

  async getTopStories(): Promise<number[]> {
    const response = await this.request.get(`${this.baseURL}/topstories.json`);
    const data = await response.json();
    return data;
  }

  async getItem(id: number): Promise<HackerNewsItem | null> {
    const response = await this.request.get(`${this.baseURL}/item/${id}.json`);
    const data = await response.json();
    return data;
  }

  async getTopStory(): Promise<HackerNewsItem | null> {
    const topStories = await this.getTopStories();
    if (topStories.length === 0) return null;
    return this.getItem(topStories[0]);
  }

  async getFirstComment(storyId: number): Promise<HackerNewsItem | null> {
    const story = await this.getItem(storyId);
    if (!story || !story.kids || story.kids.length === 0) return null;
    return this.getItem(story.kids[0]);
  }

  async validateStoryStructure(story: HackerNewsItem): Promise<boolean> {
    if (!story.id || typeof story.id !== 'number') return false;
    if (!story.type || typeof story.type !== 'string') return false;
    if (!story.time || typeof story.time !== 'number' || story.time <= 0) return false;
    
    if (story.by !== undefined && typeof story.by !== 'string') return false;
    if (story.text !== undefined && typeof story.text !== 'string') return false;
    if (story.dead !== undefined && typeof story.dead !== 'boolean') return false;
    if (story.deleted !== undefined && typeof story.deleted !== 'boolean') return false;
    if (story.parent !== undefined && typeof story.parent !== 'number') return false;
    if (story.poll !== undefined && typeof story.poll !== 'number') return false;
    if (story.kids !== undefined && !Array.isArray(story.kids)) return false;
    if (story.kids && story.kids.some(kid => typeof kid !== 'number')) return false;
    if (story.url !== undefined && typeof story.url !== 'string') return false;
    if (story.score !== undefined && typeof story.score !== 'number') return false;
    if (story.title !== undefined && typeof story.title !== 'string') return false;
    if (story.parts !== undefined && !Array.isArray(story.parts)) return false;
    if (story.parts && story.parts.some(part => typeof part !== 'number')) return false;
    if (story.descendants !== undefined && typeof story.descendants !== 'number') return false;
    
    return true;
  }

  async validateCommentStructure(comment: HackerNewsItem): Promise<boolean> {
    if (!comment.id || typeof comment.id !== 'number') return false;
    if (comment.type !== 'comment' || typeof comment.type !== 'string') return false;
    if (!comment.time || typeof comment.time !== 'number' || comment.time <= 0) return false;
    
    if (comment.by !== undefined && typeof comment.by !== 'string') return false;
    if (comment.text !== undefined && typeof comment.text !== 'string') return false;
    if (comment.dead !== undefined && typeof comment.dead !== 'boolean') return false;
    if (comment.deleted !== undefined && typeof comment.deleted !== 'boolean') return false;
    if (comment.parent !== undefined && typeof comment.parent !== 'number') return false;
    if (comment.kids !== undefined && !Array.isArray(comment.kids)) return false;
    if (comment.kids && comment.kids.some(kid => typeof kid !== 'number')) return false;
    
    return true;
  }

  async validateTopStoriesArray(topStories: number[]): Promise<boolean> {
    if (!Array.isArray(topStories)) return false;
    if (topStories.length === 0) return false;
    if (topStories.some(id => typeof id !== 'number')) return false;
    return true;
  }
} 
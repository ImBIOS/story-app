export const BASE_URL = 'https://story-api.dicoding.dev/v1';
export const USER_TOKEN_KEY = 'token';

export const REGISTER = `${BASE_URL}/register`;
export const LOGIN = `${BASE_URL}/login`;

export const STORE_STORY = `${BASE_URL}/stories`;
export const STORE_STORY_AS_GUEST = `${BASE_URL}/stories/guest`;
export const GET_ALL_STORIES = `${BASE_URL}/stories`;
export const GET_BY_ID_STORY = (id) => `${BASE_URL}/stories/${id}`;

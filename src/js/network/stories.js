import {
  GET_ALL_STORIES,
  GET_BY_ID_STORY,
  STORE_STORY,
  STORE_STORY_AS_GUEST,
  USER_TOKEN_KEY,
} from '../config';
import { PostStoryBody, Response, StoriesResponse, StoryResponse } from '../types';
import { api, getUserToken } from '../utils';

/**
 * Store new story
 * @param {PostStoryBody} data Data to store
 * @returns {Promise<{data: Response}>} Axios response
 */
export const store = async ({ description, photo, lat, lon }) =>
  await api.post(
    STORE_STORY,
    { description, photo, lat, lon },
    {
      headers: {
        Authorization: `Bearer ${getUserToken(USER_TOKEN_KEY)}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );

/**
 * Store new story as guest
 * @param {PostStoryBody} data Data to store
 * @returns {Promise<{data: Response}>} Axios response
 */
export const storeAsGuest = async ({ description, photo, lat, lon }) =>
  await api.post(
    STORE_STORY_AS_GUEST,
    { description, photo, lat, lon },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

/**
 * Get all stories
 * @param {number?} page number of page
 * @param {number?} size number of stories per page
 * @param {(1|0)?} location 1: for get all stories with location, 0: for all stories without considering location
 * @returns {Promise<{data: StoriesResponse}>} stories data
 */
export const getAll = async (page, size, location) =>
  await api.get(GET_ALL_STORIES, {
    params: {
      page,
      size,
      location,
    },
    headers: {
      Authorization: `Bearer ${getUserToken(USER_TOKEN_KEY)}`,
    },
  });

/**
 * Get story by id
 * @param {string} id story id
 * @returns {Promise<{data: StoryResponse}>} story data
 */
export const getById = async (id) =>
  await api.get(GET_BY_ID_STORY(id), {
    headers: {
      Authorization: `Bearer ${getUserToken(USER_TOKEN_KEY)}`,
    },
  });

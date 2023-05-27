/* eslint-disable jsdoc/check-property-names */

/**
 * @namespace types
 */

/**
 * @typedef {object} Story
 * @property {string} id The id of the story.
 * @property {string} name The name of the user.
 * @property {string} description The description of the story.
 * @property {string} photoUrl The photoUrl of the story.
 * @property {string} createdAt The date when the story was created.
 * @property {number?} lat The latitude of the story.
 * @property {number?} lon The longitude of the story.
 */

/**
 * @typedef {object} Response
 * @property {boolean} error The error status.
 * @property {string} message The message of the response.
 */

/**
 * @typedef {object} LoginResult
 * @property {string} name The name of the user.
 * @property {string} token The token of the user.
 * @property {string} userId The userId of the user.
 */

// TODO: This LoginResponse could be improved if we can find a way to extend the Response type.
/**
 * @typedef {object} LoginResponse
 * @property {boolean} error The error status.
 * @property {string} message The message of the response.
 * @property {LoginResult} loginResult The result of the response.
 */

// TODO: This StoriesResponse could be improved if we can find a way to extend the Response type.
/**
 * @typedef {object} StoriesResponse
 * @property {boolean} error The error status.
 * @property {string} message The message of the response.
 * @property {Story[]} listStory The list of stories.
 
// TODO: This StoryResponse could be improved if we can find a way to extend the Response type.
/**
 * @typedef {object} StoryResponse
 * @property {boolean} error The error status.
 * @property {string} message The message of the response.
 * @property {Story} story The list of stories.
 */

/**
 * @typedef {object} PostStoryBody
 * @property {string} description The description of the story.
 * @property {File} photo The photo of the story.
 * @property {number?} lat The latitude of the story.
 * @property {number?} lon The longitude of the story.
 */

exports.unused = {};

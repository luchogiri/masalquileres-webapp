import { ADD_POSTS, SET_POST } from './PostActions';

// Initial State
const initialState = { items: [] };

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POST :
      return {
        items: [action.post],
      };

    case ADD_POSTS :
      return action.posts;

    default:
      return state;
  }
};

/* Selectors */

// Get all posts
export const getPosts = state => state.posts.items;

export const getPageData = state => state.posts

// Get post by id
export const getPost = (state, id) => state.posts.items.filter(post => post._id === id)[0];

// Export Reducer
export default PostReducer;

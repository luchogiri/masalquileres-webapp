import { LOGIN, LOGOUT, CHANGE_FIELD } from './UserActions';

// Initial State
const initialState = {};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return action.user;

    case LOGOUT:
      return initialState;

    case CHANGE_FIELD:
      return {
        ...state,
        [action.field]: action.value
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all posts
export const getUser = state => state.user;

// Export Reducer
export default UserReducer;

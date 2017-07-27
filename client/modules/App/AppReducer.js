// Import Actions
import { LOGIN } from '../User/UserActions';
import { TOGGLE_LOGIN_POPUP } from './AppActions';

// Initial State
const initialState = {
  loginPopup: false
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOGIN: {
      return { ...state, token: action.token };
    }

    case TOGGLE_LOGIN_POPUP: {
      return { ...state, loginPopup: action.isOn || !state.loginPopup }
    }

    default:
      return state;
  }
};

/* Selectors */

// Get showAddPost
export const getToken = state => state.token;

// Export Reducer
export default AppReducer;

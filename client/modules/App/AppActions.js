import { callApi } from '../../util/apiCaller';

// Export Constants
export const TOGGLE_LOGIN_POPUP  = 'TOGGLE_LOGIN_POPUP';
export const SEND_SEARCH_REQUEST = 'SEND_SEARCH_REQUEST';

export function sendSearchRequest(search) {
  return (dispatch) => {
    return callApi(`search-property`, 'post', search);
  };
}

export function toogleLoginPopup(isOn) {
  return {
    type: TOGGLE_LOGIN_POPUP,
    isOn: isOn
  };
}

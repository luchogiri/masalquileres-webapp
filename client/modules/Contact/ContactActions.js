import { callApi } from '../../util/apiCaller';

// Export Constants
export const SEND_CONTACT_REQUEST = 'SEND_CONTACT_REQUEST';

export function sendSearchRequest(data) {
  return (dispatch) => {
    return callApi(`contact`, 'post', data);
  };
}

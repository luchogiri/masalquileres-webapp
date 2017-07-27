import { callApi, callApiMultipart } from '../../util/apiCaller';

// Export Constants
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const CHANGE_FIELD = 'CHANGE_FIELD';

// Export Actions
export function signUpRequest(data) {
  return (dispatch) => {
    return callApi('signup', 'post', data).then(res => {
      dispatch(login(res));
      return res;
    });
  };
}

// Export Actions
export function changeProfile(id, data) {
  return (dispatch) => {
    return callApi(`users/${id}`, 'put', data).then(res => {
      const token = sessionStorage.getItem('jwtToken');
      return { token, user: res };
    });
  };
}

export function acceptTerms(user) {
  return (dispatch) => {
    let newUser = { ...user, plan: 'Plan Básico', terms_accepted: true };
    return callApi(`users/${user._id}`, 'put', newUser).then(res => {
      const token = sessionStorage.getItem('jwtToken');
      dispatch(login({ token, user: res }));
      return res;
    });
  }
}

export function removeAvatar(user) {
  return (dispatch) => {
    return dispatch(changeProfile(user._id, {
      ...user,
      avatar: ''
    })).then(res => {
      dispatch(login(res))
    });
  }
}

export function loginRequest(data) {
  return (dispatch) => {
    return callApi('signin', 'post', data).then(res => {
      dispatch(login(res));
      return res;
    });
  };
}

export function facebookLoginRequest(data) {
  return (dispatch) => {
    return callApi('facebook-login', 'post', { ...data.data }).then(res => {
      dispatch(login(res));
      return res;
    });
  };
}

export function loginIfToken() {
  return (dispatch) => {
    const token = sessionStorage.getItem('jwtToken');
    if (token) {
      dispatch(login({
        token,
        user: JSON.parse(sessionStorage.getItem('user'))
      }))
    }
  };
}

export function uploadDNI(id, body) {
  return (dispatch) => {
    return callApiMultipart(`users/upload/${id}`, 'post', body, {}).then(res => {
      const token = sessionStorage.getItem('jwtToken');
      return {
        token,
        user: res
      };
    });
  };
}

export function uploadAvatar(id, data) {
  return (dispatch) => {
    return callApiMultipart(`users/upload-avatar/${id}`, 'post', data, {}).then(res => {
      const token = sessionStorage.getItem('jwtToken');
      return dispatch(login({
        token,
        user: res
      }));
    })
  };
}

export function login(res) {
  return (dispatch) => {
    if (!res.error) {
      sessionStorage.setItem('jwtToken', res.token);
      sessionStorage.setItem('user', JSON.stringify(res.user));
    }
    dispatch({ type: LOGIN, ...res });
  }
}

export function logout() {
  return (dispatch) => {
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('user');
    dispatch({
      type: LOGOUT
    });
  }
}

export function changeField(field, value) {
  return {
    type: CHANGE_FIELD,
    field,
    value
  }
}

export function getUsers(data) {
  return (dispatch) => {
    return callApi('users', 'get', undefined, { pageSize: 4, ...data }).then(res => {
      return res;
    });
  }
}

export function getUser(id) {
  return (dispatch) => {
    return callApi(`users/${id}`, 'get').then(res => {
      return res;
    });
  }
}

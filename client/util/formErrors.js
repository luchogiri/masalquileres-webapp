export function initialState(requiredFields) {
  const errors = {};
  requiredFields.forEach(f => {
    errors[f] = {
      error: false
    }
  });
  return { errors };
}

export function checkErrors(stateErrors, data) {
  const errors = { ...stateErrors };
  Object.keys(errors).forEach(k => {
    errors[k].error = !data[k];
  });
  return { errors };
}

export function hasError(stateErrors) {
  return Object.keys(stateErrors).reduce((r, x) => r || stateErrors[x].error, false);
}

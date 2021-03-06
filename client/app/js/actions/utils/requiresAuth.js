import {selectAuthMeta} from '../../selectors/metaSelectors';
import {hasLoaded} from '../../utils/loadingUtils';

function redirectToLogin() {
  // HACK - lazy-load AuthActions to avoid circular dependency
  return require('../AuthActions').redirectToLogin();
}

export default function requiresAuth(next) {
  return (dispatch, getState) => {
    const authMeta = selectAuthMeta(getState());
    if (!hasLoaded(authMeta)) {
      dispatch(redirectToLogin());
      return;
    }
    next(dispatch, getState, authMeta.token);
  };
}

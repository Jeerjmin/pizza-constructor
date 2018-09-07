const INITIAL_STATE = {
  sending: false,
  error: null,
  success_message: null,
  sending_login:false,
  error_login: null,
  success_message_login: null,
  user: null,
  users: null
};

export const AuthReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

      case 'AUTH_LOAD':
        return {
          ...state,
          loaded: false
        };

        case 'AUTH_LOAD_SUCCESS': {
          let user = action.profile;

          if (!user || !user._id) {
              user = null;
          }

          return {
            ...state,
            user,
            loaded: true,
            loadError: null
          }
        };

        case 'AUTH_LOAD_FAIL':
          return {
              ...state,
              loaded: false
          };

      case 'REGISTRATION':
        return {
          ...state,
          sending: true
        };

      case 'REGISTRATION_SUCCESS':
        return {
          ...state,
          error: null,
          sending: false,
          success_message: "You're successfully registerd, please login"
        };

      case 'REGISTRATION_409_ERROR':
        return {
          ...state,
          error:action.errors,
          sending: false,
          success_message: null
        }

      case 'LOGIN':
        return {
          ...state,
          sending_login: true
        };

      case 'LOGIN_SUCCESS':
      return {
        ...state,
        error_login: null,
        sending_login: false,
        user: action.user,
        loaded: true,
        success_message_login: `You're successfully logined`
      };

      case 'LOGIN_409_ERROR':
        return {
          ...state,
          error_login:action.errors,
          sending_login:false,
          success_message_login: null
        };

      case 'AUTH_LOGOUT_SUCCESS':
        return {
          ...state,
          loaded: false
        }

      case 'USERS_LOAD_SUCCESS':
        return {
          ...state,
          users:action.users
        }
    }
    return state
}

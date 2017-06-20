const INITIAL_STATE = {
  success: false,
  dataLoading: false,
  dummyData: [],
}

const datastore = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'GET_DATA':
      return { ...state, dataLoading: true }

    case 'DATA_SUCCESS':
      return { ...state,
        dataLoading: false,
        dataSuccess: true,
        dummyData: action.payload }

    // Error Handler Cases
    case 'DATA_NOT_FOUND': // For 404
      return { ...state, showError: true, notFoundError: true }

    case 'UNAUTHORIZED_ACCESS': // For 401
      return { ...state, showError: true, unAuthorizedError: true }

    case 'BAD_REQUEST': // For 400
      return { ...state, showError: true, badRequestError: true }

    case 'ERROR': // For 500
      return { ...state, showError: true, internalServerError: true }
    default:
      return state
  }
}

export default datastore

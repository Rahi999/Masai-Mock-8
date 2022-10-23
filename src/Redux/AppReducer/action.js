import {
  GET_DATA_FAILURE,
  GET_DATA_LOADING,
  GET_DATA_SUCCESS
} from "./actionsTypes";

export const getLoading = () => {
  return {
    type: GET_DATA_LOADING
  };
};

export const getFailure = () => {
  return {
    type: GET_DATA_FAILURE
  };
};

export const getSuccess = (payload) => {
  return {
    type: GET_DATA_SUCCESS,
    payload
  };
};

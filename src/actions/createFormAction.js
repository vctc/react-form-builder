import { ADD_ELEMENT, DELETE_ELEMENT, UPDATE_ELEMENT } from "./constants";

const Add = (data) => {
  return {
    type: ADD_ELEMENT,
    data,
  };
};

const Delete = (data) => {
  return {
    type: DELETE_ELEMENT,
    data,
  };
};

const Update = (data) => {
  return {
    type: UPDATE_ELEMENT,
    data,
  };
};

export const AddElement = (element) => {
  return (dispatch) => {
    dispatch(Add(element));
  };
};

export const UpdateElement = (element) => {
  return (dispatch) => {
    dispatch(Update(element));
  };
};

export const DeleteElement = (element) => {
  return (dispatch) => {
    dispatch(Delete(element));
  };
};

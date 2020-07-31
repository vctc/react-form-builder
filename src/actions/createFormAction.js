import {
  ADD_ELEMENT,
  DELETE_ELEMENT,
  UPDATE_ELEMENT,
  BULK_ADD,
  BULK_DELETE,
} from "./constants";

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

const BulkAddData = (data) => {
  return {
    type: BULK_ADD,
    data,
  };
};

const BulkDeleteData = () => {
  return {
    type: BULK_DELETE,
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

export const BulkAdd = (data) => {
  return (dispatch) => {
    dispatch(BulkAddData(data));
  };
};

export const BulkDelete = () => {
  return (dispatch) => {
    dispatch(BulkDeleteData());
  };
};

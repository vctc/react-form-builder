import { ADD_ENTRIES } from "./constants";
const add = (data) => {
  return {
    type: ADD_ENTRIES,
    data,
  };
};

export const AddEntries = (data) => {
  return (dispatch) => {
    dispatch(add(data));
  };
};

import { BULK_ADD_ENTRY, BULK_DELETE_ENTRY } from "./constants";
const BulkAddData = (data) => {
  return {
    type: BULK_ADD_ENTRY,
    data,
  };
};

const BulkDeleteData = () => {
  return {
    type: BULK_DELETE_ENTRY,
  };
};

export const BulkAddEntry = (data) => {
  return (dispatch) => {
    dispatch(BulkAddData(data));
  };
};

export const BulkDeleteEntry = () => {
  return (dispatch) => {
    dispatch(BulkDeleteData());
  };
};

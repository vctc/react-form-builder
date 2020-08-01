import { BULK_ADD_ENTRY, BULK_DELETE_ENTRY } from "../actions/constants";

function formData(state = [], action) {
  switch (action.type) {
    case BULK_ADD_ENTRY:
      return action.data;
    case BULK_DELETE_ENTRY:
      return [];
    default:
      return state;
  }
}

export default formData;

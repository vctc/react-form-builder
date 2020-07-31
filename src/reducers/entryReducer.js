import { ADD_ENTRIES } from "../actions/constants";

function entries(state = {}, action) {
  switch (action.type) {
    case ADD_ENTRIES:
      return action.data;
    default:
      return state;
  }
}

export default entries;

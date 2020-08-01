import {
  ADD_ELEMENT,
  UPDATE_ELEMENT,
  DELETE_ELEMENT,
  BULK_ADD,
  BULK_DELETE,
} from "../actions/constants";

function createForm(state = [], action) {
  switch (action.type) {
    case ADD_ELEMENT:
      return [...state, action.data];
    case UPDATE_ELEMENT:
      const updateElementinArray = (arr, data) => {
        return arr.map((ar) => {
          if (ar.id === data.id) {
            return {
              ...ar,
              label: data.label,
              placeholder: data.placeholder || null,
              required: data.required,
              options: data.options || [],
            };
          } else {
            return ar;
          }
        });
      };
      return updateElementinArray(state, action.data);
    case DELETE_ELEMENT:
      return state.filter((data) => data.id !== action.data.id);
    case BULK_ADD:
      return action.data;
    case BULK_DELETE:
      return [];
    default:
      return state;
  }
}

export default createForm;

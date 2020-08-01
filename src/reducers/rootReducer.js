import { combineReducers } from "redux";
import createForm from "./createFormReducer";
import formData from "./formDataReducer";
import entries from "./entryReducer";

export default combineReducers({
  createForm,
  formData,
  entries,
});

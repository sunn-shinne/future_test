import { combineReducers } from "redux"
import tableDataReducer from "./tableDataReducer";

export const rootReducer = combineReducers({
  tableData: tableDataReducer,
});

export type RootState = ReturnType<typeof rootReducer>
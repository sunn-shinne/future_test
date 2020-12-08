import {ActionType} from '../../interfaces'
import {
  ADD_INFO,
  CHANGE_PAGE,
  CLEAN_FILTER,
  FILTER,
  REQUEST_ERROR,
  REQUEST_SUCCESS,
  SORT_INFO,
  START_OF_REQUEST
} from "../const/tableData";
import {asc, desc, MaxCountInPage} from "../../const";
import {ceil, filtering} from "../../utils/filtering";
import {sorting} from "../../utils/sorting";
import {add_data, setDirection} from '../../utils/other';

export const initialState = {
  data: null,
  isLoading: false,
  isError: false,
  isAddingForm: false,
  currentPage: 1,
  maxPage: 1,
  maxCountInPage: MaxCountInPage,
  filterData: null,
  isFilter: false,
  sortDirection: '',
}

export default function tableDataReducer(state = initialState, action: ActionType) {
  switch (action.type) {
    case START_OF_REQUEST:
      return {...state, isLoading: true, data: null}

    case REQUEST_SUCCESS:
      const allData = action.payload
      const maxPage = ceil(allData)
      return {...state, data: action.payload, isLoading: false, currentPage: 1, maxPage: maxPage, maxCountInPage: MaxCountInPage}

    case REQUEST_ERROR:
      return {...state, data: null, isLoading: false, isError: true}

    case CHANGE_PAGE:
      return {...state, currentPage: action.payload}

    case FILTER:
      const filtData = filtering(state.data!, action.payload)
      const maxPageFilt = ceil(filtData)
      return {...state, filterData: filtData, isFilter: true, currentPage: 1, maxPage: maxPageFilt}

    case CLEAN_FILTER:
      return {...state, filterData: null, isFilter: false, currentPage: 1, maxPage: ceil(state.data!)}

    case ADD_INFO:
      const Data = state.data
      const newData = add_data(Data!, action.payload)
      const newMaxPage = ceil(newData)
      return {...state, data: newData, maxPage: newMaxPage, sortDirection: ''}

    case SORT_INFO:
      const sortDirection = setDirection(state.sortDirection)
      return {...state, data: sorting(state.data!, action.payload, sortDirection), sortDirection}
    default:
      return state
  }
}
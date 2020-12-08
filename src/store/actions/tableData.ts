import axios from 'axios'
import {ThunkAction} from 'redux-thunk'
import {Action} from 'redux'
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
import {DataType} from "../../interfaces";


export const dataRequest = (param: 'small' | 'big'): ThunkAction<void, unknown, unknown, Action<string>> => async dispatch => {
  dispatch(startRequest())
  let url: string = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
  if (param === 'big') {
    url = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
  }
  axios.get(url)
    .then((response) => {
      dispatch(requestSuccess(response.data))
    }).catch(e => {
    dispatch(requestError())
  })
}

export const startRequest = () => {
  return {
    type: START_OF_REQUEST
  }
}

export const requestSuccess = (response: Array<DataType>) => {
  return {
    type: REQUEST_SUCCESS,
    payload: response
  }
}

export const requestError = () => {
  return {
    type: REQUEST_ERROR
  }
}

export const changePage = (page: number) => {
  return {
    type: CHANGE_PAGE,
    payload: page
  }
}

export const actionFilter = (searchStr: string) => {
  return {
    type: FILTER,
    payload: searchStr
  }
}

export const actionCleanFilter = () => {
  return {
    type: CLEAN_FILTER
  }
}

export const actionAddInfo = (row: object) => {
  return {
    type: ADD_INFO,
    payload: row
  }
}

export const actionSortInfo = (key: string) => {
  return {
    type: SORT_INFO,
    payload: key
  }
}
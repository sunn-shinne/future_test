import React from "react";
import {DataType} from "../interfaces";
import {MaxCountInPage} from "../const";

export const filtering = (data: Array<DataType>, searchStr: string) => {
  if (searchStr === '') {
    return data
  }
  const regexp = new RegExp(`${searchStr}`, 'gm');

  return data.filter((i) => (
    regexp.test(i.id + '') ||
    regexp.test(i.firstName) ||
    regexp.test(i.lastName) ||
    regexp.test(i.email) ||
    regexp.test(i.phone)
  ));
}

export const ceil = (data: Array<DataType>) => {
  return Math.ceil(data.length / MaxCountInPage)
}
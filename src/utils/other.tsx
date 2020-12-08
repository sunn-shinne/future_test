import {DataType} from "../interfaces";
import {asc, desc} from "../const";

// функция добавления строки в начало
export const add_data = (data: Array<DataType>, addData: DataType) => {
  data.unshift(addData)
  return data
}
// функция определения направления сортировки
export const setDirection = (sortDirection: string) => {
  if (sortDirection === '') {
    return asc
  } else {
    return sortDirection === desc ? asc : desc
  }
}
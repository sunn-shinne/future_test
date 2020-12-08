import {DataType} from "../interfaces";
import {asc, desc} from "../const";

export const sorting = (data: Array<DataType>, key: string, sortDirection: string) => {
  // Делаем копию массива, т.к. функция сортировки меняет исходный массив, а не возвращает новый :(
  let newData = data?.concat()
  // Стандартная сортировка
  if (sortDirection === asc) {
    newData!.sort((a, b) => {
        if (a[key] < b[key]) {
          return -1;
        }
        if (a[key] > b[key]) {
          return 1;
        }
        return 0;
      }
    )
  }
  if (sortDirection === desc) {
    newData!.sort((a, b) => {
        if (b[key] < a[key]) {
          return -1;
        }
        if (b[key] > a[key]) {
          return 1;
        }
        return 0;
      }
    )
  }
  return newData
}
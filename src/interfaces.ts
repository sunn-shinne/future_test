
export interface ActionType {
  type: string
  payload: any
}

interface IObjectKeys {
  [key: string]: string | number | object;
}

export interface DataType extends IObjectKeys{
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  address: {
    streetAddress: string,
    city: string,
    state: string,
    zip: string
  },
  description: string,
}

export interface TableDataType {
  data: Array<DataType> | null,
  isLoading: boolean,
  isError: boolean,
  currentPage: number,
  maxPage: number,
  maxCountInPage: number,
  filterData: Array<DataType> | null,
  isFilter: boolean,
  sortDirection: string
}
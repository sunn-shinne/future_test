import React, {useEffect, useState} from 'react'
import {TableRow} from '../TableRow/TableRow'
import './Table.css'
import {DataType, TableDataType} from '../../interfaces';
import {asc, iconDown, iconUp} from '../../const'

interface orderBy {
  isSort: boolean,
  data: Array<DataType> | null,
  isASC: boolean,
  lastColSort: string,
  icon: JSX.Element | null
}

interface props {
  data: Array<DataType> | null,
  sortDirection: string,
  handlerIsOpenInfo: any,
  handlerSortDirection: (key: string) => void
}

const Table = (props: props) => {

  const [orderBy, setOrderBy] = useState({
    key: '',
    sortDirection: '',
    icon: <i/>,
  })

  // Обновление направления сортировки и обработка условия сортировки при добавлении новой строки
  useEffect(() => {
    if (props.sortDirection === '') {
      setOrderBy({
        key: '',
        sortDirection: '',
        icon: <i/>,
      })
    } else {
      setOrderBy((prevState => ({...prevState, sortDirection: props.sortDirection})))
    }

  }, [props.sortDirection])

  // Функция для изменения и отображения направления сортировки
  const orderByKey = (key: string) => {
    props.handlerSortDirection(key)
    // отображение направления сортировки
    const icon = orderBy.sortDirection === asc ? iconUp : iconDown
    setOrderBy({
      key,
      sortDirection: orderBy.sortDirection,
      icon: icon
    })
  }

  return (
    <div className='div_table'>
      <table className='table'>
        <thead className='thead-dark'>
        <tr>
          <th onClick={() => orderByKey('id')}>Id {orderBy.key === 'id' ? orderBy.icon : ''}</th>
          <th onClick={() => orderByKey('firstName')}>First
            Name {orderBy.key === 'firstName' ? orderBy.icon : ''}</th>
          <th onClick={() => orderByKey('lastName')}>Last
            Name {orderBy.key === 'lastName' ? orderBy.icon : ''}</th>
          <th onClick={() => orderByKey('email')}>Email {orderBy.key === 'email' ? orderBy.icon : ''}</th>
          <th onClick={() => orderByKey('phone')}>Phone {orderBy.key === 'phone' ? orderBy.icon : ''}</th>
        </tr>
        </thead>
        <tbody>
        <TableRow data={props.data} handlerIsOpenInfo={props.handlerIsOpenInfo}/>
        </tbody>
      </table>
      <hr/>
    </div>
  )
}

export default Table
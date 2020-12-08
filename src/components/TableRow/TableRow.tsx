import React from 'react'
import {DataType} from "../../interfaces";

interface props {
  data: Array<DataType> | null,
  handlerIsOpenInfo: any
}

export const TableRow = (props: props) => {

  return (
    <React.Fragment>
      {props.data!.map((row, index) => (
        <tr onClick={() => props.handlerIsOpenInfo(row)} key={index + 1}>
          <td>{row.id}</td>
          <td>{row.firstName}</td>
          <td>{row.lastName}</td>
          <td>{row.email}</td>
          <td>{row.phone}</td>
        </tr>
      ))
      }
    </React.Fragment>
  )
}
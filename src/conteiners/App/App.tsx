import React, {useCallback, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {actionSortInfo, changePage, dataRequest} from "../../store/actions/tableData";
import {RootState} from "../../store/reducers/rootReducer";
import Loader from "../../components/Loader/Loader";
import Table from "../../components/Table/Table";
import {DataType, TableDataType} from "../../interfaces";
import {Pagination} from '../../components/Pagination/Pagination';
import {Filter} from "../../components/Filter/Filter";
import {Info} from '../../components/Info/Info';
import {AddInfo} from "../../components/AddInfo/AddInfo";

function App() {
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);

  const tableData = useSelector<RootState>((store) => store.tableData)
  const {isLoading, isError, data, currentPage, maxPage, maxCountInPage, isFilter, filterData, sortDirection} = tableData as TableDataType

  const [isAddingForm, setIsAddingForm] = useState(false)

  const initDetailedInfo = {
    isOpen: false,
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      streetAddress: '',
      city: '',
      state: '',
      zip: ''
    },
    description: '',
  }

  const [detailedInfo, setDetailedInfo] = useState(initDetailedInfo)

  //  выбор данных для отображения
  let viewData = null

  if (data != null) {
    if (isFilter) {
      if (data.length > maxCountInPage) {
        viewData = filterData!.slice((maxCountInPage * currentPage) - maxCountInPage, maxCountInPage * currentPage)
      } else {
        viewData = filterData
      }
    } else {
      if (data.length > maxCountInPage) {
        viewData = data.slice((maxCountInPage * currentPage) - maxCountInPage, maxCountInPage * currentPage)
      } else {
        viewData = data
      }
    }
  }

  // переход к другой странице
  const handlerChangePage = (num: number) => {
    stableDispatch(changePage(num))
  }

  // функция показывающая или скрывающая информацию о выбранном пользователе под таблицей
  const handlerIsOpenInfo = (row: DataType) => {
    if (detailedInfo.id === row.id) {
      setDetailedInfo(initDetailedInfo)
    } else {
      setDetailedInfo({
        isOpen: true,
        id: row.id,
        firstName: row.firstName,
        lastName: row.lastName,
        email: row.email,
        phone: row.phone,
        address: {
          streetAddress: row.address.streetAddress,
          city: row.address.city,
          state: row.address.state,
          zip: row.address.zip
        },
        description: row.description,
      })
    }
  }
  // функция сортировки
  const handlerSortDirection = (key: string) => {
    stableDispatch(actionSortInfo(key))
  }


  if (data === null) { // Если данных нет
    return (
      <div className="App">

        <div className='d-flex justify-content-center mb-lg-2'>
          <button onClick={() => stableDispatch(dataRequest('small'))} className="btn btn-dark mr-2" type="submit" style={{width:'25%'}}>Small data</button>
          <button onClick={() => stableDispatch(dataRequest('big'))} className="btn btn-dark ml-2" type="submit" style={{width:'25%'}}>Big data</button>
        </div>
        {/* Отображение загрузки */}
        {isLoading
          ? <Loader/>
          : null
        }
        {/* Отображение ошибки */}
        {isError
          ? <p className='text-center font-weight-bolder text-danger text-uppercase mt-5'>Error</p>
          : null
        }
      </div>
    );
  } else { // иначе, если данные уже есть
    return (
      <div className="App">

        <div className='d-flex justify-content-center m-xl-4'>
          <button onClick={() => stableDispatch(dataRequest('small'))} className="btn btn-dark mr-2" type="submit" style={{width:'25%'}}>Small data</button>
          <button onClick={() => stableDispatch(dataRequest('big'))} className="btn btn-dark ml-2" type="submit" style={{width:'25%'}}>Big data</button>
        </div>

        <Filter/>

        <button onClick={() => setIsAddingForm(!isAddingForm)} className="btn btn-dark d-flex m-auto mb-lg-3 justify-content-center" type="button" style={{width:'80%'}}>Add
          info
        </button>
        {
          isAddingForm
            ? <AddInfo/>
            : null
        }


        <Table data={viewData} sortDirection={sortDirection} handlerIsOpenInfo={handlerIsOpenInfo} handlerSortDirection={handlerSortDirection}/>

        {
          detailedInfo.isOpen
            ? <Info id={detailedInfo.id} firstName={detailedInfo.firstName} lastName={detailedInfo.lastName}
                    email={detailedInfo.email} phone={detailedInfo.phone} address={detailedInfo.address}
                    description={detailedInfo.description}/>
            : null
        }

        <Pagination currentPage={currentPage} maxPage={maxPage} handlerChangePage={handlerChangePage}/>
      </div>
    );
  }
}

export default App;

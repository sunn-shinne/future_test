import React, {useCallback, useRef} from "react";
import {useDispatch} from "react-redux";
import {actionCleanFilter, actionFilter} from "../../store/actions/tableData";

export const Filter = () => {
  const input = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);

  const handlerFilter = () => {
    if (input.current!.value === '') {
      stableDispatch(actionCleanFilter())
    } else {
      stableDispatch(actionFilter(input.current!.value))
    }
  }

  return (
    <>
      <h4  style={{margin: '10px', textAlign: 'center'}} className='display-5'>Data search</h4>
      <div className='d-flex justify-content-center mb-lg-4'>
        <input className='form-control' style={{width: '45%'}} ref={input}/>
        <button style={{marginLeft: '10px'}} className='btn btn-info' onClick={handlerFilter}>Find</button>
      </div>
    </>
  )
}
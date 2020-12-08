import React, {useCallback, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {actionAddInfo} from "../../store/actions/tableData";


export const AddInfo = () => {
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);

  const idRef = useRef<HTMLInputElement>(null)
  const FNRef = useRef<HTMLInputElement>(null)
  const LNRef = useRef<HTMLInputElement>(null)
  const ERef = useRef<HTMLInputElement>(null)
  const PRef = useRef<HTMLInputElement>(null)

  const [inputsValues, setInputValues] = useState({
    idValue: '',
    fnValue: '',
    lnValue: '',
    eValue: '',
    pValue: ''
  })
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [buttonStyle, setButtonStyle] = useState({
    width: '100px',
    marginBottom: "auto",
    marginTop: '25px',
    cursor: 'not-allowed'
  })

  // Функция обновления значений инпутов
  const handlerUpdateValues = (input: string) => {

    if (input == 'id') {
      setInputValues(prev => ({...prev, idValue: idRef.current!.value}))
    }
    if (input == 'FN') {
      setInputValues(prev => ({...prev, fnValue: FNRef.current!.value}))
    }
    if (input == 'LN') {
      setInputValues(prev => ({...prev, lnValue: LNRef.current!.value}))
    }
    if (input == 'E') {
      setInputValues(prev => ({...prev, eValue: ERef.current!.value}))
    }
    if (input == 'P') {
      setInputValues(prev => ({...prev, pValue: PRef.current!.value}))
    }

    // Если в каждом инпуте есть хотя бы 1 символ, значит активируется кнопка добавить строку
    if (idRef.current!.value.length >= 1 && FNRef.current!.value.length >= 1 && LNRef.current!.value.length >= 1 && ERef.current!.value.length >= 1
      && PRef.current!.value.length >= 1) {

      setButtonDisabled(false)
      setButtonStyle(prev => ({...prev, cursor: 'pointer'}))
    } else {
      setButtonDisabled(true)
      setButtonStyle(prev => ({...prev, cursor: 'not-allowed'}))
    }
  }

  const handlerAddInfo = () => {
    stableDispatch(actionAddInfo({
      id: Number(inputsValues.idValue),
      firstName: inputsValues.fnValue,
      lastName: inputsValues.lnValue,
      email: inputsValues.eValue,
      phone: inputsValues.pValue
    }))
  }

  return (
    <div style={{display: "flex", margin: '20px', justifyContent: "center"}}>

      <label style={{marginRight: "20px"}}>Id <input style={{width: '165px'}} className='form-control' ref={idRef}
                                                     onChange={() => handlerUpdateValues('id')}/></label>
      <label style={{marginRight: "20px"}}>First Name<input style={{width: '165px'}} className='form-control'
                                                            ref={FNRef}
                                                            onChange={() => handlerUpdateValues('FN')}/></label>
      <label style={{marginRight: "20px"}}>Last Name <input style={{width: '165px'}} className='form-control'
                                                            ref={LNRef}
                                                            onChange={() => handlerUpdateValues('LN')}/></label>
      <label style={{marginRight: "20px"}}>Email <input style={{width: '165px'}} className='form-control' ref={ERef}
                                                        onChange={() => handlerUpdateValues('E')}/></label>
      <label style={{marginRight: "20px"}}>Phone <input style={{width: '165px'}} className='form-control' ref={PRef}
                                                        onChange={() => handlerUpdateValues('P')}/></label>
      <button disabled={buttonDisabled} className='btn btn-info'
              style={buttonStyle}
              onClick={handlerAddInfo}>
        Add
      </button>
    </div>
  )
}
import React, { useState } from 'react'
import { CirclePicker } from 'react-color'
import CloseIcon from '@mui/icons-material/Close'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import { addNewTagAsync } from '../../Pages/Profile/slicer/tagSlice'

import s from './modalTag.module.scss'

function ModalAddTag({ openAddTag, setOpenAddTag }) {
  ModalAddTag.propTypes = {
    openAddTag: PropTypes.bool,
    setOpenAddTag: PropTypes.func,
  }

  const [color, setColor] = useState('#4caf50')
  const [isDisabledBtn, setIsDisabledBtn] = useState(true)
  const [tagName, setTagName] = useState('')

  const dispatch = useDispatch()

  /* проверка параметров для активации кнопки */
  const activateSubmitBtn = () => {
    if (tagName.trim().length > 0 && color) {
      setIsDisabledBtn(false)
    }
  }

  /* имя метки */
  const handleTagName = (e) => {
    setTagName(e.currentTarget.value)
    activateSubmitBtn()
  }
  /* цвет метки */
  const handleTagColor = (color) => {
    setColor(color.hex)
    activateSubmitBtn()
  }
  /* добавление метки в БД */
  /*
    !userId установлена константа
  */
  const handleAddNewTag = () => {
    dispatch(addNewTagAsync({ userId: 4, labelName: tagName, labelColor: color }))
    setOpenAddTag(false)
  }

  return (
    <div className={openAddTag ? s.modal : s.modal_hidden}>
      <div className={s.wrapper}>
        <div className={s.header}>
          <h2>Создание метки</h2>
          <CloseIcon onClick={() => setOpenAddTag(false)} />
        </div>
        <div>
          <label htmlFor="labelName">
            Название
            <input type="text" id="labelName" value={tagName} onChange={(e) => handleTagName(e)} />
          </label>
        </div>
        <div>
          <h6>Цвет</h6>
          <CirclePicker id="palette" color={color} onChange={(color) => handleTagColor(color)} />
        </div>
        <div>
          <button type="submit" disabled={isDisabledBtn} onClick={handleAddNewTag}>
            Создать
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalAddTag

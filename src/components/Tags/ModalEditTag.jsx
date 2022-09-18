import React, { useState } from 'react'
import { CirclePicker } from 'react-color'
import { Dialog, DialogActions, DialogContent, DialogContentText, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import { editTagAsync, deleteTagAsync } from '../../Pages/Profile/slicer/tagSlice'

import s from './modalTag.module.scss'

function ModalEditTag({
  openEditTag,
  setOpenEditTag,
  selectedTagId,
  selectedTagName,
  setSelectedTagName,
  selectedTagColor,
  setSelectedTagColor,
}) {
  ModalEditTag.propTypes = {
    openEditTag: PropTypes.bool,
    setOpenEditTag: PropTypes.func,
    selectedTagId: PropTypes.number,
    selectedTagName: PropTypes.string,
    setSelectedTagName: PropTypes.func,
    selectedTagColor: PropTypes.string,
    setSelectedTagColor: PropTypes.func,
  }
  const dispatch = useDispatch()

  const [openModal, setOpenModal] = useState(false)

  /* Редактирование метки */
  const handleEditTag = () => {
    dispatch(
      editTagAsync({ id: selectedTagId, labelName: selectedTagName, labelColor: selectedTagColor }),
    )
    setOpenEditTag(false)
  }
  /* open and close dialog modal window  */
  const handleClickOpen = () => {
    setOpenModal(true)
  }
  const handleClose = () => {
    setOpenModal(false)
  }

  /* Удаление метки */
  const handleDeleteTag = () => {
    dispatch(deleteTagAsync({ id: selectedTagId }))
    setOpenEditTag(false)
    setOpenModal(false)
  }

  return (
    <div className={openEditTag ? s.modal : s.modal_hidden}>
      <div className={s.wrapper}>
        <div className={s.header}>
          <h2>Редактирование метки</h2>
          <CloseIcon onClick={() => setOpenEditTag(false)} />
        </div>
        <div>
          <label htmlFor="labelName">
            Название
            <input
              type="text"
              id="labelName"
              value={selectedTagName}
              onChange={(e) => setSelectedTagName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <h6>Цвет</h6>
          <CirclePicker
            id="palette"
            color={selectedTagColor}
            onChange={(color) => setSelectedTagColor(color.hex)}
          />
        </div>
        <div>
          <button type="submit" onClick={handleEditTag}>
            Сохранить
          </button>
        </div>
        <div>
          <button type="submit" className={s.deleteBtn} onClick={handleClickOpen}>
            Удалить
          </button>
        </div>
      </div>
      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Вы действительно хотите удалить метку?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Нет</Button>
          <Button onClick={handleDeleteTag} autoFocus>
            Да
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ModalEditTag

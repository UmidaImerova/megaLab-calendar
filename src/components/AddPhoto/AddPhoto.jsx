import React, { useState, useRef } from 'react'
import style from './AddPhotoStyle.module.scss'
import plusIcon from './assets/plusIcon.svg'

function AddPhoto() {
  const [file, setFile] = useState({})
  const [filename, setFilename] = useState('Добавьте фото профиля')
  /* Declare a variable for the DOM node: */
  const fileInput = useRef(null)

  const onChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
      setFilename(e.target.files[0].name)
    }
  }
  return (
    <div className={style.addPhoto}>
      <label htmlFor="addPhoto">
        <input type="file" id="addPhoto" multiple={false} ref={fileInput} onChange={onChange} />
        <img src={plusIcon} alt="icon" />
      </label>
      <span>{filename}</span>
    </div>
  )
}

export default AddPhoto

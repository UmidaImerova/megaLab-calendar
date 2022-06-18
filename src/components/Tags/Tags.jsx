import React from 'react'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import s from './tagStyle.module.scss'

function Tags() {
  return (
    <div className={s.tagsContainer}>
      <div className={s.tagHeader}>
        <h6> Мои метки</h6>
        <AddBoxOutlinedIcon sx={{ color: 'primary.main' }} />
      </div>
      <div className={s.tagList}>
        <ul>
          <li className={s.tag}>
            <div className={s.tagColor} />
            <p>Рабочий</p>
          </li>
          <li className={s.tag}>
            <div className={s.tagColor} />
            <p>Личный</p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Tags

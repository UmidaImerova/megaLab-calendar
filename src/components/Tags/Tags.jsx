import React from 'react'
import s from './tagStyle.module.scss'
import plusImg from './assets/Plus.svg'

function Tags() {
  return (
    <div className={s.tagsContainer}>
      <div className={s.tagHeader}>
        <h5> Мои метки</h5>
        <div className={s.plusIcon}>
          <img src={plusImg} alt="addTagIcon" />
        </div>
      </div>
      <div className={s.tagList}>
        <ul>
          <li className={s.tag}>
            <div className={s.tagColor} />
            <div className={s.tagTitle}>Рабочий</div>
          </li>
          <li className={s.tag}>
            <div className={s.tagColor} />
            <div className={s.tagTitle}>Личный</div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Tags

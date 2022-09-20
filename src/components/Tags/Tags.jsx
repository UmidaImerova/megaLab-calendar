import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import s from './tagStyle.module.scss'
import plusImg from './assets/Plus.svg'

function Tags({
  handleOpenAddTag,
  setSelectedTagId,
  setOpenEditTag,
  setSelectedTagName,
  setSelectedTagColor,
}) {
  Tags.propTypes = {
    handleOpenAddTag: PropTypes.func,
    setSelectedTagId: PropTypes.func,
    setSelectedTagName: PropTypes.func,
    setSelectedTagColor: PropTypes.func,
    setOpenEditTag: PropTypes.func,
  }

  const allTags = useSelector((state) => state.tagsList.tags)

  const handleEditTag = (e) => {
    const tagId = Number(e.currentTarget.value)
    const selectedTag = allTags.filter((tag) => tag.id === tagId)
    const inputValue = selectedTag[0].labelName
    const color = selectedTag[0].labelColor
    setSelectedTagId(tagId)
    setSelectedTagName(inputValue)
    setSelectedTagColor(color)
    setOpenEditTag(true)
  }

  return (
    <div className={s.tagsContainer}>
      <div className={s.tagHeader}>
        <h5> Мои метки</h5>
        <div className={s.plusIcon}>
          <button className={s.iconBtn} type="button" onClick={handleOpenAddTag}>
            <img src={plusImg} alt="addTagIcon" />
          </button>
        </div>
      </div>
      <div className={s.tagList}>
        <ul>
          {allTags.map((tag) => (
            <button
              className={s.tagBtn}
              key={tag.id}
              type="button"
              value={tag.id}
              onClick={(e) => handleEditTag(e)}
            >
              <li className={s.tag}>
                <div className={s.tagColor} style={{ background: `${tag.labelColor}` }} />
                <div className={s.tagTitle}>{tag.labelName}</div>
              </li>
            </button>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Tags

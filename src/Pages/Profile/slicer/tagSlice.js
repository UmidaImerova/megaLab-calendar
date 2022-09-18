import { createSlice } from '@reduxjs/toolkit'

const axios = require('axios').default

const initialState = { tags: [] }

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    getTags(state, action) {
      state.tags = action.payload
    },
  },
})

export const { getTags } = tagsSlice.actions
export default tagsSlice.reducer

export const getTagsListAsync = () => async (dispatch) => {
  const URL = 'https://megalab-app.herokuapp.com/api/v1/label/find-all'
  try {
    const response = await axios.get(URL)
    dispatch(getTags(response.data))
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
  }
}

export const addNewTagAsync = (data) => async (dispatch) => {
  const URL = 'https://megalab-app.herokuapp.com/api/v1/label/create'
  try {
    await axios.post(URL, data)
    dispatch(getTagsListAsync())
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
  }
}

export const editTagAsync = (data) => async (dispatch) => {
  const URL = 'https://megalab-app.herokuapp.com/api/v1/label/update'
  try {
    await axios.patch(URL, data)
    dispatch(getTagsListAsync())
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
  }
}

export const deleteTagAsync = (data) => async (dispatch) => {
  const URL = 'https://megalab-app.herokuapp.com/api/v1/label/delete'
  try {
    await axios.delete(`${URL}/${data.id}`)
    dispatch(getTagsListAsync())
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
  }
}

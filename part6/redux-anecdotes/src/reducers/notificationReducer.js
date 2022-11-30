import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload || state
    },
    clearNotification(state, action) {
      return null
    }
  }
})

const { setNotification: set, clearNotification } = notificationSlice.actions

export const setNotification = (message, delay) => {
  return async (dispatch) => {
    set(message)

    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch(clearNotification())
        resolve()
      }, delay * 1000)
    })
  }
}

export default notificationSlice.reducer

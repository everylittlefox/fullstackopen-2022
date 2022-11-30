import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setQuery(state, action) {
      return action.payload
    }
  }
})

export const { setQuery } = filterSlice.actions
export default filterSlice.reducer

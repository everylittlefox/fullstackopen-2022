import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdote = state.find((a) => a.id === id)
      anecdote.votes++
    }
  }
})

export const { addAnecdote, setAnecdotes, voteAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer

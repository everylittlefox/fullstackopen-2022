const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'anecdotes/VOTE':
      const idx = state.findIndex((a) => a.id === action.data)
      const votedAnecdote = { ...state[idx], votes: state[idx].votes + 1 }

      return [...state.slice(0, idx), votedAnecdote, ...state.slice(idx + 1)]

    case 'anecdotes/ADD_ANECDOTE':
      return state.concat(action.data)

    default:
      return state
  }
}

export const createAnecdote = (anecdote) => ({
  type: 'anecdotes/ADD_ANECDOTE',
  data: asObject(anecdote)
})

export const voteAnecdote = (id) => ({ type: 'anecdotes/VOTE', data: id })

export default reducer

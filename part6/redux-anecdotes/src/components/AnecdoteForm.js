import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdote'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdote = async (e) => {
    e.preventDefault()

    const newAnecdote = await anecdoteService.createAnecdote(
      e.target.anecdote.value
    )
    dispatch(addAnecdote(newAnecdote))
    e.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

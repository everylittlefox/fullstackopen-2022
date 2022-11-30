import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setAnecdotes, voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdote'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    const anecdotesWithFilter = filter
      ? anecdotes.filter((a) =>
          a.content.toLowerCase().includes(filter.toLowerCase())
        )
      : anecdotes
    return anecdotesWithFilter.slice().sort((a, b) => b.votes - a.votes)
  })
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService.getAll().then((as) => dispatch(setAnecdotes(as)))
  }, [dispatch])

  const vote = (id) => {
    dispatch(voteAnecdote(id))
    const anecdote = anecdotes.find((a) => a.id === id).content
    dispatch(setNotification(`you voted '${anecdote}'`))
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList

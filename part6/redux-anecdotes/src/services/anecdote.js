import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const anecdoteService = {
  async createAnecdote(content) {
    const response = await axios.post(baseUrl, { content, votes: 0 })
    return response.data
  },
  async getAll() {
    return (await axios.get(baseUrl)).data
  },
  async voteForAnecdote(anecdote) {
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, {
      ...anecdote,
      votes: anecdote.votes + 1
    })
    return response.data
  }
}

export default anecdoteService

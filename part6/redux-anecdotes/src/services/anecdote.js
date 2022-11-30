import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const anecdoteService = {
  async createAnecdote(content) {
    const response = await axios.post(baseUrl, {content, votes: 0})
    return response.data
  },
  async getAll() {
    return (await axios.get(baseUrl)).data
  }
}

export default anecdoteService

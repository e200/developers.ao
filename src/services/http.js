import axios from 'axios'

const http = axios.create({
  baseURL: "https://api.github.com",
});

export default http

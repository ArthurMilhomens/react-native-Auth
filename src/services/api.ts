import axios from 'axios';

const api = axios.create({
  baseURL: 'https://vf-back-dev-weahgtp7mq-ue.a.run.app/api'
});

export default api;
import axios from 'axios';

export default axios.create({
    baseURL: 'https://recruitment.ultimate.systems/',
    timeout: 1000,
  });
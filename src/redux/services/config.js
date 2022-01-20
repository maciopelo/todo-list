import axios from "axios";

export default axios.create({
  baseURL: "https://maciopelo-todo-list-strapi.herokuapp.com/",
  timeout: 1000,
});

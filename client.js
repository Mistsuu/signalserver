const apisauce = require("apisauce");

const api = apisauce.create({
  headers: {
    Accept: "application/json",
    // "Content-Type": "application/x-www-form-urlencoded"
  },
  timeout: 1000,
  baseURL: "http://localhost:1208",
})

api.post('/todos', { findaway: "toaccessthisjustbyjson" }, { headers: { 'x-ray': 'machine' } })
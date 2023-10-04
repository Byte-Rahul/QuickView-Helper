const route = require('express').Router();
const summary = require('../controller/summaryController')

route.post('/summarize', summary.summaryHelper)
route.post('/translate', summary.translateHelper)

module.exports = route;
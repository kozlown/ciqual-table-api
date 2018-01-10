const { router, get } = require('microrouter')
const { send } = require('micro')

const getData = require('./data')

let data = null

console.info('Downloading data... please wait "Ready" message')

getData.then((d) => {
  data = d
  console.info('Ready')
})

const aliment = (req, res) => {
  send(res, 200, data.alimentTable.toString())
}

const composition = (req, res) => {
  send(res, 200, data.compositionTable.toString())
}

const constant = (req, res) => {
  send(res, 200, data.constantTable.toString())
}

module.exports = router(
  get('/aliment', aliment),
  get('/composition', composition),
  get('/constant', constant)
)

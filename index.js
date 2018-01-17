const { router, get } = require('microrouter')
const { send } = require('micro')
const parse = require('obj-parse')
const deepKeys = require('deep-keys')
const micro = require('micro')

const getData = require('./data')

let data = null

console.info('Downloading data...')

getData.then((d) => {
  data = d
  console.info('Server listening on port 3001')
})

const removeArrays = elem => {
  if (Array.isArray(elem)) {
    elem = [ ...elem ]
  } else {
    elem = { ...elem }
  }
  deepKeys(elem).forEach(key => {
    const get = parse(key)
    const set = parse(key).assign
    if (Array.isArray(get(elem))) {
      set(elem, get(elem)[0])
    }
  })
  return elem
}

const alimentNutrients = (req, res) => {
  const composition = data.compositionTable.TABLE.COMPO.filter(
    element => parseInt(element.alim_code[0]) === parseInt(req.params.alimcode)
  )
  send(res, 200, composition.map(removeArrays))
}

const searchAliment = (req, res) => {
  const keyWords = req.query.keywords.split(' ')

  const aliments = removeArrays(data.alimentTable.TABLE.ALIM).filter(aliment => {
    return keyWords.every(keyword => {
      return aliment.alim_nom_fr.toLowerCase().includes(keyword.toLowerCase())
      || aliment.alim_nom_eng.toLowerCase().includes(keyword.toLowerCase())
    })
  })
  send(res, 200, aliments.map(removeArrays))
}

const cors = ( middleware ) => {
  return (req, res, next) => {
    res.setHeader(
      'Access-Control-Allow-Origin',
      '*'
    )
    middleware(req, res, next)
  }
}

const server = micro(cors(router(
  get('/:alimcode/nutrients', alimentNutrients),
  get('/search', searchAliment)
)))

server.listen(3001)

const { router, get } = require('microrouter')
const { send } = require('micro')
const parse = require('obj-parse')
const deepKeys = require('deep-keys')


const getData = require('./data')

let data = null

console.info('Downloading data... please wait "Ready" message')

getData.then((d) => {
  data = d
  console.info('Ready')
})

const alimentNutrients = (req, res) => {
  const composition = data.compositionTable.TABLE.COMPO.filter(
    element => parseInt(element.alim_code[0]) === parseInt(req.params.alimcode)
  )
  const removeArrays = elem => {
    deepKeys(elem).forEach(key => {
      const get = parse(key)
      const set = parse(key).assign
      if (Array.isArray(get(elem))) {
        set(elem, get(elem)[0])
      }
    })
    return elem
  }
  send(res, 200, composition.map(removeArrays))
}

const searchAliment = (req, res) => {
  const keyWords = req.query.keywords.split('+')
  const aliments = data.alimentTable.TABLE.ALIM.filter(aliment => {
    return keyWords.every(keyword => {
      return aliment.alim_nom_index_fr.some(indexFr => {
        return indexFr.toLowerCase().includes(keyword.toLowerCase())
      }) || aliment.alim_nom_index_eng.some(indexEng => {
        return indexEng.toLowerCase().includes(keyword.toLowerCase())
      })
    })
  })
  send(res, 200, aliments)
}

module.exports = router(
  get('/:alimcode/nutrients', alimentNutrients),
  get('/search', searchAliment)
)

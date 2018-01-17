const request = require('request')
const unzip = require('unzipper')
const { parseString } = require('xml2js')
var legacy = require('legacy-encoding')

module.exports = new Promise((resolve, reject) => {
  let alimentTable = ''
  let compositionTable = ''
  let constantTable = ''
  let nbFinishedFiles = 0

  request('https://ciqual.anses.fr/cms/sites/default/files/inline-files/TableCiqual2017_XML_2017%2011%2021.zip')
    .pipe(unzip.Parse())
    .on('entry', entry => {
      const fileName = entry.path
      if (!['alim_2017 11 21.xml', 'compo_2017 11 21.xml', 'const_2017 11 21.xml'].includes(fileName)) {
        entry.on('data', () => {})
        return
      }
      entry.on('end', () => {
        nbFinishedFiles += 1
        let tableToParse = null
        switch (fileName) {
          case 'alim_2017 11 21.xml':
            tableToParse = alimentTable
            break
          case 'compo_2017 11 21.xml':
            tableToParse = compositionTable
            break
          case 'const_2017 11 21.xml':
            tableToParse = constantTable
            break
        }
        parseString(tableToParse, (err, result) => {
          if (err) {
            reject (err)
          }
          switch (fileName) {
            case 'alim_2017 11 21.xml':
              alimentTable = result
              break
            case 'compo_2017 11 21.xml':
              compositionTable = result
              break
            case 'const_2017 11 21.xml':
              constantTable = result
              break
          }
          if (nbFinishedFiles === 3) {
            resolve({ alimentTable, compositionTable, constantTable })
          }
        })
      })
      const decode = value => legacy.decode(value, 'windows-1252')
      entry.on('data', chunk => {
        switch (fileName) {
          case 'alim_2017 11 21.xml':
            alimentTable += decode(chunk)
            break
          case 'compo_2017 11 21.xml':
            compositionTable += decode(chunk)
            break
          case 'const_2017 11 21.xml':
            constantTable += decode(chunk)
            break
        }
      })
    })
})
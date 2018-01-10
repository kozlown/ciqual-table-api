const request = require('request')
const unzip = require('unzip')
const { parseString } = require('xml2js')

module.exports = new Promise((resolve, reject) => {
  let alimentTable = ''
  let compositionTable = ''
  let constantTable = ''
  let nbFinishedFiles = 0

  request('https://ciqual.anses.fr/cms/sites/default/files/inline-files/TableCiqual2017_XML_2017%2011%2021.zip')
    .pipe(unzip.Parse())
    .on('entry', function (entry) {
      const fileName = entry.path
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
        if (tableToParse !== null) {
          parseString(tableToParse, (err, result) => {
            if (err) {
              reject (err)
            }
            tableToParse = result
          })
        }
        if (nbFinishedFiles === 5) {
          resolve({ alimentTable, compositionTable, constantTable })
        }
      })
      entry.on('data', chunk => {
        switch (fileName) {
          case 'alim_2017 11 21.xml':
            alimentTable += chunk.toString()
            break
          case 'compo_2017 11 21.xml':
            compositionTable += chunk.toString()
            break
          case 'const_2017 11 21.xml':
            constantTable += chunk.toString()
            break
        }
      })
    })
})
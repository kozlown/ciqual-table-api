# ciqual-table-api
REST API for the [Ciqual French Food Composition Table](https://ciqual.anses.fr/).

Data source: [ANSES-CIQUAL French food composition table version 2017](https://ciqual.anses.fr/cms/sites/default/files/inline-files/TableCiqual2017_XML_2017%2011%2021.zip).

Currently deployed right [there](http://www.kozlown.me:3001).

# routes

## search

Search aliments by keywords.

**GET** `/search?keywords=${keywords}`

**keywords:** search keywords separated by + or space.

*example :*

`/search?keywords=french+bread`

[check it out](http://www.kozlown.me:3001/search?keywords=french+bread)


## aliment

Any query concerning a single aliment.

### nutrients

Get the nutrients of an aliment.

**GET** `/${alim_code}/nutrients`

**alim_code:** aliment code, specified for every aliment on a search query.

*example :*

`/1000/nutrients`

[check it out](http://www.kozlown.me:3001/1000/nutrients)

# Licence

MIT License

Copyright (c) 2018 Nigel Kozlowski

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


'use strict'

const assert = require('assert')
const readStations = require('db-hafas-stations')

const autocomplete = require('.')

const hasResult = (query, id, limit = 5) => {
	const results = autocomplete(query, limit)
	assert.ok(results.find(res => res.id === id), `"${query}": missing ${id}`)
}

const frankfurtHbf = '8000105'
hasResult('frankfu', frankfurtHbf)
const hamburgDammtor = '8002548'
hasResult('dammt', hamburgDammtor)
const mittweida = '8012369'
hasResult('mittwe', mittweida)

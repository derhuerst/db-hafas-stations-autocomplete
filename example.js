'use strict'

const readStations = require('db-hafas-stations')
const prompt = require('cli-autocomplete')

const autocomplete = require('.')

new Promise((resolve, reject) => {
	const res = Object.create(null)
	readStations()
	.on('data', (s) => {
		res[s.id] = s
	})
	.once('end', () => {
		resolve(res)
	})
	.once('error', reject)
})
.then((stationsById) => {
	const suggest = (query) => {
		const results = autocomplete(query, 5)

		const choices = []
		for (let result of results) {
			const station = stationsById[result.id]
			if (!station) continue

			choices.push({
				title: [
					station.name,
					'–',
					'score:', result.score.toFixed(3),
					'relevance:', result.relevance.toFixed(3)
				].join(' '),
				value: station.id
			})
		}

		return Promise.resolve(choices)
	}

	prompt('Type a station name!', suggest)
	.once('abort', () => {
		process.exitCode = 1
	})
	.once('submit', id => console.log(id))
})
.catch((err) => {
	console.error(err)
	process.exit(1)
})

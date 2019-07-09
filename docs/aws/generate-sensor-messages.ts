import { Chance } from 'chance'
import { v4 } from 'uuid'
import { createWriteStream, WriteStream } from 'fs'
import * as path from 'path'

const numMessages = parseInt(process.argv[process.argv.length - 2], 10)
const outDir = process.argv[process.argv.length - 1]

const allSensors = [] as string[]
for (let i = 0; i < 5; i++) {
	allSensors.push(v4())
}

const c = new Chance()

function* generateSensorMessage() {
	let i = 0
	while (true) {
		yield {
			timestamp: c.date({
				min: new Date('2019-01-01T00:00:00'),
				max: new Date(),
			}) as Date,
			temp: allSensors.reduce(
				(temps, sensor) => ({
					...temps,
					[sensor]:
						Math.sin((i++ % 360) / (360 * (allSensors.indexOf(sensor) + 1))) *
						20,
				}),
				{} as { [key: string]: number },
			),
		} as const
	}
}

const openFiles = {} as { [key: string]: WriteStream }

const openFile = async (filename: string) => {
	if (!openFiles[filename]) {
		console.log(`Open ${filename}...`)
		openFiles[filename] = createWriteStream(filename, { flags: 'a' })
	}
	return openFiles[filename]
}

const main = async () => {
	const messageGenerator = generateSensorMessage()
	for (let i = 0; i < numMessages; i++) {
		const m = messageGenerator.next().value
		const file = await openFile(
			path.join(
				path.resolve(outDir),
				`${m.timestamp.toISOString().substr(0, 7)}.multijson`,
			),
		)
		file.write(JSON.stringify(m) + '\n')
		console.log((i / numMessages) * 100)
	}
	Object.entries(openFiles).forEach(([f, s]) =>
		s.end(() => {
			console.log(`Closed ${f}.`)
		}),
	)
}

main().catch(err => {
	console.error(err)
	process.exit(1)
})

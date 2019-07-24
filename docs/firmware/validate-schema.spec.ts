import * as Ajv from 'ajv'
import { promises as fs } from 'fs'
import * as path from 'path'

const ajv = new Ajv()

describe('schema.json', () => {
	it('should validate state.json', async () => {
		const schema = await fs.readFile(
			path.resolve(process.cwd(), 'docs', 'firmware', 'schema.json'),
			'utf-8',
		)
		const state = await fs.readFile(
			path.resolve(process.cwd(), 'docs', 'firmware', 'state.json'),
			'utf-8',
		)
		const validate = ajv.compile(JSON.parse(schema))
		const valid = await validate(JSON.parse(state))
		expect(validate.errors).toBeNull()
		expect(valid).toBeTruthy()
	})
})

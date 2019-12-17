/**
 * Example of parsing and generating OAS 2.0 JSON files.
 */
const wap = require('webapi-parser').WebApiParser
const path = require('path')

async function main () {
  // Parse OAS 2.0 JSON file
  const inPath = path.join(__dirname, '../api-specs/oas20/api-with-types.json')
  const model = await wap.oas20.parse(`file://${inPath}`)

  // Get User.age property
  const age = model.declares[0].properties[2]

  // Set age minimum to 18
  age.range.withMinimum(18)

  // Set age maximum to 120
  age.range.withMaximum(120)

  // Set API media/content type to ['application/json+ld']
  model.encodes.withContentType(['application/json+ld'])

  const outPath = path.join(__dirname, './generated.json')
  console.log('Generating file to:', outPath)

  // Generate file with changed OAS 2.0 content
  await wap.oas20.generateFile(model, `file://${outPath}`)
}

main()

const { exec } = require('child_process')
const path = require('path')

const { generateIconFiles } = require('./utils/generateIconFilesFromJson')

exec('git log -1 --name-status --pretty="format:"', async (_undefined, stdout) => {
  // updateDescription(getDescription(stdout))
  console.log("LOG: ", stdout)
})

console.log("LOG: ", __dirname)
const bezierIconsDirectory = path.resolve(__dirname, '..')
console.log("LOG: ", __dirname, bezierIconsDirectory)
const iconsJson = path.resolve(bezierIconsDirectory, 'icons.json')

generateIconFiles(iconsJson, bezierIconsDirectory)

const path = require('path')

const { generateIconFiles } = require('./utils/generateIconFilesFromJson')

console.log("LOG: ", __dirname)
const bezierIconsDirectory = path.resolve(__dirname, '..')
console.log("LOG: ", __dirname, bezierIconsDirectory)
const iconsJson = path.resolve(bezierIconsDirectory, 'icons.json')

generateIconFiles(iconsJson, bezierIconsDirectory)

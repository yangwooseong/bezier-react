const path = require('path')

const { generateIconFiles } = require('./utils/generateIconFilesFromJson')

const bezierIconsDirectory = path.resolve(__dirname, '..')
console.log("LOG: ", bezierIconsDirectory)
const iconsJson = path.resolve(bezierIconsDirectory, 'icons.json')

generateIconFiles(iconsJson, bezierIconsDirectory)

const path = require('path')
const { execSync } = require('child_process')

const { generateIconFiles } = require('./generateIconFilesFromJson')

console.log("LOG: ", __dirname)
const bezierIconsDirectory = path.resolve(__dirname, '..')

console.log("LOG: ", bezierIconsDirectory)
const iconsJson = path.resolve(bezierIconsDirectory, 'icons.json')

generateIconFiles(iconsJson, bezierIconsDirectory)

const fs = require('fs')
const path = require('path')

const svgo = require('svgo')

const bezierIconsDirectory = path.resolve(__dirname, '..')
const iconsJson = path.resolve(bezierIconsDirectory, 'icons.json')
const iconsDir = path.join(bezierIconsDirectory, 'icons')
const svgs = JSON.parse(fs.readFileSync(iconsJson, 'utf-8'))

const makeIconsDirectoryIfNotExists = () => {
  if (fs.existsSync(iconsDir)) {
    fs.rmdir(iconsDir)
  }
  fs.mkdirSync(iconsDir)
}

const makeSvgFiles = ([iconName, svgObject]) => {
  const svgPath = path.resolve(iconsDir, `${iconName}.svg`)
  const { svg } = svgObject
  const svgElement = svgo.optimize(svg, {
    js2svg: {
      indent: 2,
      pretty: true,
    },
  }).data

  fs.writeFileSync(svgPath, svgElement, 'utf-8')
}

const generateSVG = () => {
  makeIconsDirectoryIfNotExists()

  Object.entries(svgs)
    .sort(([iconName1], [iconName2]) => iconName1.localeCompare(iconName2))
    .map(makeSvgFiles)
}

generateSVG()

const fs = require('fs')
const path = require('path')

function generateFilesExpressions(filesPath) {
  return (
    fs
      .readdirSync(filesPath)
      .filter(filename => filename.match(/png|jpg|jpeg|gif|webp|mp3|mp4/i))
      .map(filename => {
        const name = filename.split(path.extname(filename))[0]
        const key = name
          .split('_')
          .map(v => `${v[0].toUpperCase()}${v.slice(1)}`)
          .join('')
        return `  ${key}: require('./${filename}'),`
      })
      .join('\n') + '\n'
  )
}

const imageRes = 'export default {\n' + generateFilesExpressions('src/assets/images') + '}\n'
fs.writeFileSync('./src/assets/images/index.ts', imageRes)

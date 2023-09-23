const { exec } = require('child_process')

exec('git log -1 --raw', (undefined, stdout) => {
  console.log('LOG: ', stdout)
})

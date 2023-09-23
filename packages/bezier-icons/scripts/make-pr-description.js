const { exec } = require('child_process')

let log;

exec('git log -1 --raw', (undefined, stdout) => {
  log = stdout
})

console.log(`"var=${log}" >> "$OUTPUT"`)

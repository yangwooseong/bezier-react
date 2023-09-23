const { exec } = require('child_process')

const { Octokit } = require('octokit')

const githubToken = process.argv[0]
const octokit = new Octokit({
  auth: githubToken,
})

const keyToHeader = {
  M: 'Modified 🖊️\n',
  A: 'Added 🎨\n',
  D: 'Deleted 🗑️\n',
}

const getIconName = path => path.split('/').at(-1)

const getDescription = gitLog => {
  let description = 'Update Icons 😃\n\n'

  const updatedAndIconPath = gitLog
    .trim()
    .split('\n')
    .map(line => line.split('\t'))
    .filter(line => line[1].endsWith('.svg'))
    .reduce((acc, cur) => {
      const [key, file] = cur
      const header = keyToHeader[key]
      const icon = `- ${getIconName(file)}`

      if (!acc[header]) {
        acc[header] = [icon]
      } else {
        acc[header].push(icon)
      }
      return acc
    }, {})

  for (const [key, icons] of Object.entries(updatedAndIconPath)) {
    description += key
    description += icons.join('\n')
  }

  return description
}

exec('git log -1 --name-status --pretty="format:"', async (_undefined, stdout) => {
  const description = getDescription(stdout)

  await octokit.rest.pulls.update({
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: description,
  })
})


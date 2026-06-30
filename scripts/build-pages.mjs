import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'

const rootDir = process.cwd()
const distDir = join(rootDir, 'dist')
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const pagesBasePath = process.env.VITE_BASE_PATH ?? (repoName ? `/${repoName}/` : '/portfolio/')

function runNpm(args, cwd, env = {}) {
  const executable = process.env.npm_execpath ? process.execPath : 'npm'
  const fullArgs = process.env.npm_execpath ? [process.env.npm_execpath, ...args] : args
  const result = spawnSync(executable, fullArgs, {
    cwd,
    env: { ...process.env, ...env },
    stdio: 'inherit',
    shell: !process.env.npm_execpath && process.platform === 'win32',
  })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

runNpm(['run', 'build'], rootDir, { VITE_BASE_PATH: pagesBasePath })
writeFileSync(join(distDir, '.nojekyll'), '')

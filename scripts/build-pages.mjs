import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'

const rootDir = process.cwd()
const neoDir = join(rootDir, 'apps', 'neo')
const distDir = join(rootDir, 'dist')
const neoDistDir = join(neoDir, 'dist')

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

runNpm(['run', 'build'], rootDir, { VITE_BASE_PATH: '/portfolio/' })
runNpm(['run', 'build'], neoDir, { VITE_BASE_PATH: '/portfolio/neo/' })

rmSync(join(distDir, 'neo'), { recursive: true, force: true })
mkdirSync(join(distDir, 'neo'), { recursive: true })
cpSync(neoDistDir, join(distDir, 'neo'), { recursive: true })
writeFileSync(join(distDir, '.nojekyll'), '')

import {expect, test} from '@oclif/test'

import cmd = require('../src')

describe('pse-tracker-cli', () => {
  test
  .stdout()
  .do(() => cmd.run([]))
  .it('runs pse BPI', ctx => {
    expect(ctx.stdout).to.contain('BPI')
  })

  test
  .stdout()
  .do(() => cmd.run(['--name', 'jeff']))
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})

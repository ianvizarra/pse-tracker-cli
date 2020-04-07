import {expect, test} from '@oclif/test'

import cmd = require('../src')

describe('display stock', () => {
  test
  .stdout()
  .do(() => cmd.run(['BPI']))
  .it('runs pse BPI', ctx => {
    expect(ctx.stdout).to.contain('')
  })
})

describe('display stock with flags', () => {
  test
  .stdout()
  .do(() => cmd.run(['--stock', 'BPI']))
  .it('runs pse --stock=BPI', ctx => {
    expect(ctx.stdout).to.contain('')
  })
})

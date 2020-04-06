import {Command, flags} from '@oclif/command'
import axios from 'axios'
import clear = require('clear')
import ora = require('ora')
import terminalLink = require('terminal-link')
import chalk = require('chalk')
import {bmcline, bmcurl, twitterhandle, twitterline, description} from './lib/labels'
import {APIResponse} from './types/stock'
import {Table} from './lib/table'
import {apiURL} from './lib/config'

const spinner = ora({text: 'Loading Stock Info'})

class PseCliTracker extends Command {
  static description = description

  static examples = [
    '$ pse BDO',
    '$ pse --stock=BDO',
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    stock: flags.string({char: 's', description: 'Stock symbol to display'}),
  }

  static args = [{name: 'stock'}]

  async run() {
    const {args, flags} = this.parse(PseCliTracker)
    const symbol  = flags.stock || args.stock
    if (symbol) {
      clear()
      spinner.start()
      this.getStocks(symbol).then(result => {
        spinner.stop()
        this.display(result.data)
      }).catch(() => {
        spinner.fail('Unable to load stock')
      })
    }
  }

  async getStocks(symbol: string) {
    const stockInfo = await axios.get(`${apiURL}/stocks/${symbol}.json`)
    return stockInfo
  }

  display(apiData: APIResponse) {
    const table = new Table()
    const tableData = table.build(apiData)
    this.log(tableData)
    // Display info
    const n = '\n'
    const t = ' '
    const footer = n + t + bmcline + n + n + t +
                   terminalLink(chalk.green(bmcurl), bmcurl) + t + n + n + t + twitterline + n + t +
                   terminalLink(chalk.blue(twitterhandle), 'https://twitter.com/' + twitterhandle) + n
    this.log(footer)
  }
}

export = PseCliTracker

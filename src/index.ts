import {Command, flags} from '@oclif/command'
import axios from 'axios'
import clear = require('clear')
import ora = require('ora')
import {APIResponse} from './types/stock'
import {Table} from './lib/table'

const spinner = ora({text: 'Loading Stock Info'})

class PseCliTracker extends Command {
  static description = 'Display Stock Info'

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
    const stockInfo = await axios.get(`https://phisix-api.appspot.com/stocks/${symbol}.json`)
    return stockInfo
  }

  display(apiData: APIResponse) {
    const table = new Table()
    const tableData = table.build(apiData)
    this.log(tableData)
  }
}

export = PseCliTracker

import {Command, flags} from '@oclif/command'
import axios from 'axios'
import clear = require('clear')
import ora = require('ora')
import Table = require('cli-table3')
import {Stock, APIResponse} from './stock'

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
    const table = this.buildTable(apiData)
    this.log(table)
  }

  buildTable(apiData: APIResponse) {
    const stock = apiData.stock[0]
    const table = new Table({
      style: {
        head: [],
        border: [],
      },
    })

    table.push(
      ['Name', stock.name],
      ['Symbol', stock.symbol],
      ['Price', `${stock.price.currency} ${stock.price.amount}`],
      ['Percentage Change', stock.percent_change],
      ['Volume', stock.volume],
      ['As of', apiData.as_of]
    )
    return table.toString()
  }
}

export = PseCliTracker

import chalk = require('chalk')
import {APIResponse} from '../types/stock'
import Table3 = require('cli-table3')

const pkg = require('../../package.json')
const border = (char: string) => chalk.blue(char)

export class Table {
    private chars =  {top: border('═'), 'top-mid': border('╤'), 'top-left': border('╔'), 'top-right': border('╗'),
      bottom: border('═'), 'bottom-mid': border('╧'), 'bottom-left': border('╚'), 'bottom-right': border('╝'),
      left: border('║'), 'left-mid': border('╟'), mid: border('─'), 'mid-mid': border('┼'),
      right: border('║'), 'right-mid': border('╢'), middle: border('│')}

    percentChange(change: number) {
      if (change < 0) {
        return chalk.redBright(change + '%')
      }
      return chalk.greenBright(change + '%')
    }

    white(text: string) {
      return chalk.bold.white(text)
    }

    build(apiData: APIResponse) {
      const stock = apiData.stock[0]
      const as_of = new Date(apiData.as_of)
      const table = new Table3({chars: this.chars})

      table.push(
        [{colSpan: 2, content: chalk.bold.greenBright(`Philippine Stock Exchange CLI Tracker v${pkg.version}`)}],
        [{colSpan: 2, content: chalk.bold.yellowBright('As of ' + as_of.toLocaleString())}],
        [chalk.bold.cyanBright('Name'), this.white(stock.name)],
        [chalk.bold.red('Symbol'), this.white(stock.symbol)],
        [chalk.bold.yellowBright('Price'), this.white(`${stock.price.currency} ${stock.price.amount.toFixed(2)}`)],
        [chalk.bold.green('% Change'), this.percentChange(stock.percent_change)],
        [chalk.bold.blue('Volume'), this.white(stock.volume.toLocaleString())],
      )
      return table.toString()
    }
}

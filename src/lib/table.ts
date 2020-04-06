import chalk = require('chalk')
import Table3 = require('cli-table3')
import terminalLink = require('terminal-link')
import {APIResponse} from '../types/stock'
import {apiURL} from './config'

const pkg = require('../../package.json')
const border = (char: string) => chalk.blue(char)

export class Table {
    private chars =  {top: border('═'), 'top-mid': border('╤'), 'top-left': border('╔'), 'top-right': border('╗'),
      bottom: border('═'), 'bottom-mid': border('╧'), 'bottom-left': border('╚'), 'bottom-right': border('╝'),
      left: border('║'), 'left-mid': border('╟'), mid: border('─'), 'mid-mid': border('┼'),
      right: border('║'), 'right-mid': border('╢'), middle: border('│')}

    public code = `Code: ${terminalLink(pkg.homepage, pkg.homepage)}`

    public source = `Source: ${terminalLink(apiURL, apiURL)}`

    percentChange(change: number) {
      return (change < 0) ?
        chalk.redBright(change + '%') :
        chalk.greenBright(change + '%')
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
        [{colSpan: 2, content: chalk.white(this.source)}],
        [{colSpan: 2, content: chalk.white(this.code)}],
      )
      return table.toString()
    }
}

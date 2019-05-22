'use strict'

/**
 * 输出的日志级别
 */
const chalk = require('chalk'); /**chalk 终端显示banner */
const figlet = require('figlet'); /**chalk 终端banner字体镂空 */
const error = exports.error = chalk.bold.red; /**chalk error提示 */
const warning = exports.warning = chalk.keyword('orange'); /**chalk 警告提示 */
const success =  chalk.green;

/**警告 */
const warnLog = exports.warnLog = (...params) => {
    return console.log(warning(params.join(' ')));
}

/**错误 */
const errorLog = exports.errorLog = (...params) => {
    return console.log(error(params.join(' ')));
}

/**成功 */
const successLog = exports.successLog = (...params) => {
    return console.log(success(params.join(' ').toString()));
}

/**镂空 */
const hole = exports.hole = (value) => {
    return console.log(chalk.yellow(figlet.textSync(value, {horizontalLayout: 'full'})))
}
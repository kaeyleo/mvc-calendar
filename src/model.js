export default class Model {
  constructor () {
    this.date = new Date()
    this.todaysDate = new Date()
    console.log('this is Model')
  }

  getDate () {
    return this.date
  }

  /**
   * set date
   * @param {object} date
   */
  setDate (date) {
    this.date = date
  }

  getMonthLabel (isAbbreviated = false) {
    const localeMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_')
    const localeMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_')

    const year = this.date.getFullYear()
    const month = this.date.getMonth()

    const locale = isAbbreviated ? localeMonthsShort : localeMonths
    const monthStr = locale[month]

    const monthLabel = `${monthStr} ${year}`

    return monthLabel
  }

  /**
   * get prev or next month
   * @param {object} date
   * @param {string} type: 'preve' or 'next'
   */
  getPrevOrNextMonthDate (date, type) {
    const d = new Date(date)
    const month = type === 'prev'
      ? date.getMonth() - 1
      : date.getMonth() + 1

    d.setMonth(month)
    return d
  }
}

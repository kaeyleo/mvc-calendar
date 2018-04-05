export default class Model {
  constructor () {
    this.date = new Date()
    this.todaysDate = new Date()
    console.log('this is Model')
  }

  getDate () {
    return this.date
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
}

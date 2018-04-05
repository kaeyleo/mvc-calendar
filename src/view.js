export default class View {
  constructor () {
    this.$monthLabel = document.querySelector('.month-label')
    this.$prevBtn = document.querySelector('.prev-btn')
    this.$nextBtn = document.querySelector('.next-btn')
    console.log('this is View')
  }

  /**
   * Render month label
   * @param {object} date
   * @param {boolean} isAbbreviated
   */
  setMonthLabel (date, isAbbreviated = false) {
    const localeMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_')
    const localeMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_')

    const year = date.getFullYear()
    const month = date.getMonth()

    const locale = isAbbreviated ? localeMonthsShort : localeMonths
    const monthStr = locale[month]

    this.$monthLabel.innerText = `${monthStr} ${year}`
  }
}

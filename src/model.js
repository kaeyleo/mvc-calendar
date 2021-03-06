export default class Model {
  constructor () {
    this.date = new Date()
    this.todaysDate = new Date()
    this.daysOptions = {}
    this.selectedDate = this.getTodaysDateStr()
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

  getTodaysDateStr () {
    const todaysYear = this.todaysDate.getFullYear()
    const todaysMonth = this.todaysDate.getMonth() + 1
    const today = this.todaysDate.getDate()
    const todaysDate = `${todaysYear} ${todaysMonth} ${today}`

    return todaysDate
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

  getSelectedDate () {
    return this.selectedDate
  }

  updateSelectedDate (date) {
    this.selectedDate = date
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

  getFirstDay (date) {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    return firstDay
  }

  getPrevMonthDays (date) {
    const year = date.getFullYear()
    const month = date.getMonth()
    const d = new Date(year, month, 0)
    return d.getDate()
  }

  /**
   * get prev/next/current month data
   */
  getRecentMonths () {
    // current
    const currentDate = this.date
    const month = currentDate.getMonth()
    // prev
    const prevDate = new Date(currentDate)
    prevDate.setMonth(month - 1)
    // next
    const nextDate = new Date(currentDate)
    nextDate.setMonth(month + 1)

    const currentMonthData = this.getMonthDaysData(currentDate)
    const prevMonthData = this.getMonthDaysData(prevDate)
    const nextMonthData = this.getMonthDaysData(nextDate)

    return {
      currentMonth: currentMonthData,
      prevMonth: prevMonthData,
      nextMonth: nextMonthData
    }
  }

  /**
   * {
   *   date: '2018 4 6' #日期
   *   value: 6 #显示日期
   *   isToday: true
   *   isCurrentMonth: true
   * }
   */
  getMonthDaysData (date) {
    if (date === undefined) return

    const year = date.getFullYear()
    const month = date.getMonth() + 1
    let monthDay = 0

    const todaysYear = this.todaysDate.getFullYear()
    const todaysMonth = this.todaysDate.getMonth() + 1
    const today = this.todaysDate.getDate()

    const prevMonthDays = this.getPrevMonthDays(date)
    const days = new Date(year, month, 0).getDate() // 这个月天数
    const firstDay = this.getFirstDay(date)
    const lastDay = new Date(`${year}, ${month}, ${days}`).getDay() // 这个月最后一天星期几
    const weekDays = 7
    let weeksLen = (firstDay + days + 6 - lastDay) / weekDays
    weeksLen = Math.round(weeksLen)

    const data = []

    for (let i = 0; i < weeksLen; i++) {
      const weeks = []
      let nextMonthDay = 0
      for (let j = 0; j < weekDays; j++) {
        const day = {}
        day.isCurrentMonth = false

        if (i === 0 && j < firstDay) {
          let y = year
          let m = month - 1
          const prevMonthDate = 1 + prevMonthDays - firstDay + j
          if (month === 1) {
            y--
            m = 12
          }
          day.date = `${y} ${m} ${prevMonthDate}`
          day.value = prevMonthDate
          weeks.push(day)
          continue
        }
        if (i === weeksLen - 1 && j > lastDay) {
          nextMonthDay++
          let y = year
          let m = month + 1
          if (month === 12) {
            y++
            m = 1
          }
          day.date = `${y} ${m} ${nextMonthDay}`
          day.value = nextMonthDay
          weeks.push(day)
          continue
        }

        monthDay++
        day.date = `${year} ${month} ${monthDay}`
        day.value = monthDay
        day.isCurrentMonth = true

        const todaysDate = `${todaysYear} ${todaysMonth} ${today}`
        if (day.date === todaysDate) day.isToday = true

        const daysOptions = this.daysOptions
        for (let dayOpt in daysOptions) {
          if (day.date !== dayOpt) continue
          const item = daysOptions[dayOpt]
          if (item.isSelecte) day.isSelecte = true
        }

        weeks.push(day)
      }
      data.push(weeks)
    }
    // console.log(data)
    return data
  }
}

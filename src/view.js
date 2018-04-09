export default class View {
  constructor () {
    this.$monthLabel = document.querySelector('.month-label')
    this.$prevBtn = document.querySelector('.prev-btn')
    this.$nextBtn = document.querySelector('.next-btn')
    this.$beforeDateBody = document.querySelectorAll('.date-body')[0]
    this.$currentDateBody = document.querySelectorAll('.date-body')[1]
    this.$nextDateBody = document.querySelectorAll('.date-body')[2]
    console.log('this is View')
  }

  /**
   * Render month label
   * @param {object} date
   * @param {boolean} isAbbreviated
   */
  setMonthLabel (value) {
    this.$monthLabel.innerText = value
  }

  renderMonth (data, selectedDate) {
    const {currentMonth, prevMonth, nextMonth} = data

    this.$currentDateBody.innerHTML = this.getMonthTemplate(currentMonth, selectedDate)
    this.$beforeDateBody.innerHTML = this.getMonthTemplate(prevMonth, selectedDate)
    this.$nextDateBody.innerHTML = this.getMonthTemplate(nextMonth, selectedDate)

    const $dateBodyGroup = document.querySelector('.date-body-group')
    const $dateTablePlaceholder = document.querySelector('.date-table-placeholder')

    let currentMonthHeight = this.$currentDateBody.offsetHeight // 当前月份日历高度
    currentMonthHeight += 8
    let prevMonthHeight = this.$beforeDateBody.offsetHeight // 获取上个月日历高度
    prevMonthHeight += 12

    $dateTablePlaceholder.style = `height: ${currentMonthHeight}px;` // 初始化容器高度
    $dateBodyGroup.style = `transform: translateY(-${prevMonthHeight}px);` // 移动焦点到当前月份
  }

  getMonthTemplate (data, selectedDate) {
    if (data === undefined || data === []) return

    let htmlStr = ''

    for (let i = 0, len = data.length; i < len; i++) {
      htmlStr += '<tr class="days-row">'

      for (let j = 0, len = data[i].length; j < len; j++) {
        const day = data[i][j]
        const classArr = ['day']

        if (!day.isCurrentMonth) classArr.push('day-disabled')
        if (day.isToday) classArr.push('day-today')
        if (selectedDate === day.date && day.isCurrentMonth) classArr.push('day-selected')

        const extendClass = classArr.join(' ')

        htmlStr += `<td data-date="${day.date}" class="${extendClass}">${day.value}</td>`
      }
      htmlStr += '</tr>'
    }

    return htmlStr
  }

  updateSelectedDate (oldDate) {
    const el = document.querySelector(`[data-date="${oldDate}"]`)
    if (!el) return
    el.classList.remove('day-selected')
  }

  bindToPrevMonth (handler) {
    this.$prevBtn.addEventListener('click', () => {
      handler()
    })
  }

  bindToNextMonth (handler) {
    this.$nextBtn.addEventListener('click', () => {
      handler()
    })
  }

  bindDaysEvent (handler) {
    this.$currentDateBody.addEventListener('click', event => {
      const target = event.target
      const isDayEl = target.className.indexOf('day') > -1
      const disabledEl = target.className.indexOf('day-disabled') > -1

      if (isDayEl && !disabledEl) {
        const date = target.dataset.date
        target.classList.add('day-selected')
        handler(date)
      }
    })
  }
}

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
    // let h = this.$beforeDateBody.offsetHeight // 上个月高度
    // console.log(h)
    // h += 12

    // 当前高度
    // let ch = this.$currentDateBody.offsetHeight
    // console.log(ch)
    // ch += 8
    // const placeholder = document.querySelector('.date-table-placeholder')
    // placeholder.style = `height: ${ch}px;`

    // const bb = document.querySelector('.date-body-group')
    // setTimeout(() => {
    //   bb.style = `transform: translateY(-${h}px);`
    // }, 600)
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

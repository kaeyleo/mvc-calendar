export default class View {
  constructor () {
    this.$monthLabel = document.querySelector('.month-label')
    this.$prevBtn = document.querySelector('.prev-btn')
    this.$nextBtn = document.querySelector('.next-btn')
    this.$dateBody = document.querySelector('.date-body')
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

  showMonthDays (data, selectedDate) {
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
    this.$dateBody.innerHTML = htmlStr
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
    this.$dateBody.addEventListener('click', event => {
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

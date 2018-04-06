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

  showMonthDays (data) {
    let htmlStr = ''

    for (let i = 0, len = data.length; i < len; i++) {
      htmlStr += '<tr class="days-row">'

      for (let j = 0, len = data[i].length; j < len; j++) {
        const day = data[i][j]
        const classArr = ['day']

        if (!day.isCurrentMonth) classArr.push('day-disabled')
        if (day.isToday) classArr.push('day-today')
        if (day.isToday) classArr.push('day-today')

        const extendClass = classArr.join(' ')

        htmlStr += `<td class="${extendClass}">${day.value}</td>`
      }
      htmlStr += '</tr>'
    }
    this.$dateBody.innerHTML = htmlStr
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
}

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
  setMonthLabel (value) {
    this.$monthLabel.innerText = value
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

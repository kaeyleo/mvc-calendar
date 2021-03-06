export default class Controller {
  constructor (model, view) {
    this.model = model
    this.view = view
    console.log('this is Controller')

    view.bindToPrevMonth(this.toPrevMonth.bind(this))
    view.bindToNextMonth(this.toNextMonth.bind(this))
    view.bindDaysEvent(this.bindDaysEvent.bind(this))
  }

  init () {
    this.updateMonthLabel()
    this.showMonthDays()
  }

  updateMonthLabel () {
    const monthLabel = this.model.getMonthLabel()
    this.view.setMonthLabel(monthLabel)
  }

  showMonthDays () {
    const data = this.model.getRecentMonths()
    const selectedDate = this.model.getSelectedDate()
    console.log(data)
    // this.view.showMonthDays(data, selectedDate)
    this.view.renderMonth(data, selectedDate)
  }

  toPrevMonth () {
    const date = this.model.getDate()
    const prevMonthDate = this.model.getPrevOrNextMonthDate(date, 'prev')
    this.model.setDate(prevMonthDate)
    this.updateMonthLabel()
    this.showMonthDays()
  }

  toNextMonth () {
    const date = this.model.getDate()
    const nextMonthDate = this.model.getPrevOrNextMonthDate(date, 'next')
    this.model.setDate(nextMonthDate)
    this.updateMonthLabel()
    this.showMonthDays()
  }

  bindDaysEvent (newDate) {
    const oldDate = this.model.getSelectedDate()
    this.view.updateSelectedDate(oldDate)
    this.model.updateSelectedDate(newDate)
  }
}

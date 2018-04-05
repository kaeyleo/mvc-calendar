export default class Controller {
  constructor (model, view) {
    this.model = model
    this.view = view
    console.log('this is Controller')

    view.bindToPrevMonth(this.toPrevMonth.bind(this))
    view.bindToNextMonth(this.toNextMonth.bind(this))
  }

  init () {
    this.updateMonthLabel()
  }

  updateMonthLabel () {
    const monthLabel = this.model.getMonthLabel()
    this.view.setMonthLabel(monthLabel)
  }

  toPrevMonth () {
    const date = this.model.getDate()
    const prevMonthDate = this.model.getPrevOrNextMonthDate(date, 'prev')
    this.model.setDate(prevMonthDate)
    this.updateMonthLabel()
  }

  toNextMonth () {
    const date = this.model.getDate()
    const nextMonthDate = this.model.getPrevOrNextMonthDate(date, 'next')
    this.model.setDate(nextMonthDate)
    this.updateMonthLabel()
  }
}

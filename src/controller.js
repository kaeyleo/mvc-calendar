export default class Controller {
  constructor (model, view) {
    this.model = model
    this.view = view
    console.log('this is Controller')
  }

  init () {
    const monthLabel = this.model.getMonthLabel()
    this.view.setMonthLabel(monthLabel)

    const date = this.model.getDate()
    this.model.getPrevOrNextMonthDate(date, 'prev')
    this.model.getPrevOrNextMonthDate(date, 'next')
  }
}

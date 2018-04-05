export default class Controller {
  constructor (model, view) {
    this.model = model
    this.view = view
    console.log('this is Controller')
  }

  init () {
    const date = this.model.getDate()
    this.view.setMonthLabel(date)
  }
}

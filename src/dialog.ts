import { SlackWebAPI } from './slack'

interface DialogUI {
  title: string
  description: string,
  submit_label: string
}

interface DialogElement {
  label: string,
  name: string,
  hint?: string,
  optional?: boolean
}

interface DialogInput extends DialogElement {
  placeholder?: string,
  max_length?: number
  value?: string
}

export default class Dialog {
  ui: DialogUI
  callback: string
  state: any
  notify: boolean
  elements: any[]

  constructor (ui: DialogUI, callback: string, state = null, notify = false) {
    this.ui = ui
    this.callback = callback
    this.state = state
    this.notify = notify
    this.elements = []
  }

  // await dialog.addElemenet({
  //   label: dialogCopy.inputs.asignee.label,
  //   name: 'asignee',
  //   type: 'select',
  //   value: res.locals.user.slackId,
  //   data_source: 'users',
  //   hint: dialogCopy.inputs.asignee.hint,
  //   max_length: 150
  // })

  addInput (el: DialogInput) {
    this.elements.push({
      ...el,
      type: 'text'
    })
    return this
  }

  async openForm (trigger: string) {
    await SlackWebAPI.dialog.open({
      trigger_id: trigger,
      dialog: {
        ...this.ui,
        elements: this.elements,
        callback_id: this.callback
      }
    }).then(res => {
      return res
    }).catch(err => {
      throw new Error(err)
    })
  }
}

const regexMatcher = (regex: RegExp, str: string) => {
  if (str) {
    var res = str.match(regex)
    if (res == null) { return false } else { return true }
  } else {
    return true
  }
}

export const isNumeric = (num: any) => {
  return !isNaN(num)
}

export const isValidURL = (str: string) => {
  return regexMatcher(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
    str)
}

export const isDeadline = (str: string) => {
  return regexMatcher(
    /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{2}$/g,
    str)
}

export const isDelete = (str: string) => {
  return regexMatcher(
    /DELETE/g,
    str)
}
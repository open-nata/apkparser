export default class Manifest {
  constructor() {
    this._entry = ''
    this._packageName = ''
    this._activities = []
    this._permissions = []
    this._receivers = []
  }

  addActivity(activity) {
    this._activities.push(activity)
  }

  addPermission(permission) {
    this._permissions.push(permission)
  }

  addReceiver(receiver) {
    this._receivers.push(receiver)
  }

  get receivers() {
    return this._receivers
  }

  get activities() {
    return this._activities
  }

  get permissions() {
    return this._permissions
  }

  get packageName() {
    return this._packageName
  }

  set packageName(packageName) {
    this._packageName = packageName
  }

  get entry() {
    return this._entry
  }

  set entry(entry) {
    this._entry = entry
  }
}
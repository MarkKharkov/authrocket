const config  = require ('../config');
const { has, isString } = require ('lodash');
const request = require ('../utils/request');

class Action {
  constructor (actionName, actionData, endpoint) {
    this.name = actionName
    this.endpoint = endpoint || this.name
    this.init(actionData)
  }

  init (actionData) {
    this.isList = true;
    if (actionData) {
      this.actionData = actionData;
      if (isString(actionData)) { // String id/username provided
        this.isList = false;
        return this.id = this.actionData;
      }
      if (has(actionData, 'id') || has(actionData, 'username')) { // Check for object to have id or username
        this.isList = false;
        return this.id = actionData.id ? actionData.id : actionData.username;
      }
    }
  }

  getUrl (includeId=true){
    return this.isList ?
      `${config.urls.api}/${this.endpoint}` :
      `${config.urls.api}/${this.endpoint}/${includeId ? (this.id ? this.id : '') : ''}`
  }

  get url () {
    return this.getUrl();
  }

  /**
   * Get item
   * @return {Promise}
   */
  get (data) {
    return request.get(this.url, data).then(res => res.error ? Promise.reject(res.error) : res)
  }

  /**
   * List items.
   * @param data
   * @returns {Promise<T | never>}
   */
  list (data) {
    return request.get(this.getUrl(false), data).then(res => res.error ? Promise.reject(res.error) : res)
  }

  /**
   * Add item
   * @param newData
   * @returns {Promise<T | never>}
   */
  add (newData) {
    return request.post(this.url, newData).then(res => res.error ? Promise.reject(res.error) : res)
  }

  /**
   * Update item
   * @param updateData
   * @returns {Promise<T | never>}
   */
  update (updateData) {
    return request.put(this.url, updateData).then(res => res.error ? Promise.reject(res.error) : res)
  }

  /**
   * Remove item
   * @param data
   * @returns {Promise<T | never>}
   */
  remove (data) {
    return request.del(this.url, data).then(res => res.error ? Promise.reject(res.error) : res)
  }
}

module.exports = Action;

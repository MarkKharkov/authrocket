const config = require('../config');
const rp = require('request-promise');

const request = {
  /** Run get request with provided data
   * @param {String} endpoint - Endpoint to send request to
   * @param {Object|String} queryData - Query string data
   * @param {Boolean} includeHeaders - Whether or not to include auth headers
   * @return {Promise}
   */
  get (endpoint, queryData, includeHeaders) {
    const headers = getHeaders(includeHeaders);
    let options = {
      method: 'GET',
      uri: endpoint,
      qs: queryData,
      headers: headers,
      json: true
    };
    if (process && process.env && process.env.AUTHROCKET_VERBOSE) {
      console.log(`\n\npackage authrocket-node : get request\n`, options, `\n`);
    }
    return handleResponse(options);
  },

  /** Run POST request with provided data
   * @param {String} endpoint - Endpoint to send request to
   * @param {Object|String} data - Request data
   * @param {Boolean} includeHeaders - Whether or not to include auth headers
   * @return {Promise}
   */
  post (endpoint, data, includeHeaders) {
    const headers = getHeaders(includeHeaders);
    let options = {
      method: 'POST',
      uri: endpoint,
      body: data,
      headers: headers,
      json: true
    };
    if (process && process.env && process.env.AUTHROCKET_VERBOSE) {
      console.log(`\n\npackage authrocket-node : post request\n`, options, `\n`);
    }
    return handleResponse(options);
  },

  /** Run PUT request with provided data
   * @param {String} endpoint - Endpoint to send request to
   * @param {Object|String} data - Request data
   * @param {Boolean} includeHeaders - Whether or not to include auth headers
   * @return {Promise}
   */
  put (endpoint, data, includeHeaders) {
    const headers = getHeaders(includeHeaders);
    let options = {
      method: 'PUT',
      uri: endpoint,
      body: data,
      headers: headers,
      json: true
    };
    if (process && process.env && process.env.AUTHROCKET_VERBOSE) {
      console.log(`\n\npackage authrocket-node : put request\n`, options, `\n`);
    }
    return handleResponse(options);
  },

  /** Run DELETE request with provided data
   * @param {String} endpoint - Endpoint to send request to
   * @param {Object|String} data - Request data
   * @param {Boolean} includeHeaders - Whether or not to include auth headers
   * @return {Promise}
   */
  del (endpoint, data, includeHeaders) {
    const headers = getHeaders(includeHeaders);
    let options = {
      method: 'DELETE',
      uri: endpoint,
      body: data,
      headers: headers,
      json: false
    };
    if (process && process.env && process.env.AUTHROCKET_VERBOSE) {
      console.log(`\n\npackage authrocket-node : delete request\n`, options, `\n`);
    }
    return handleResponse(options);
  }
};

module.exports = request;

/** Wrap response in promise that has error handling
 * @private
 */
function handleResponse (options) {
  return rp(options);
}


/** Attach headers to request
 * @private
 */
function getHeaders (include) {
  if (typeof include === 'undefined' || include) {
    return getAuthRocketHeaders()
  }
  return include
}

/** Add auth rocket headers to request
 * @private
 */
function getAuthRocketHeaders () {
  if (!config.accountId && !config.apiKey && !config.realmId) {
    return {};
  }
  let result = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  config.accountId && (result['X-Authrocket-Account'] = config.accountId);
  config.apiKey && (result['X-Authrocket-Api-Key'] = config.apiKey);
  config.realmId && (result['X-Authrocket-Realm'] = config.realmId);
  return result;
}


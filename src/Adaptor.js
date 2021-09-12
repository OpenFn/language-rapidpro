/** @module Adaptor */
import {
  execute as commonExecute,
  composeNextState,
  expandReferences,
  http,
} from '@openfn/language-common';

const { axios } = http;
exports.axios = axios;

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for http.
 * @example
 * execute(
 *   create('foo'),
 *   delete('bar')
 * )(state)
 * @function
 * @param {Operations} operations - Operations to be performed.
 * @returns {Operation}
 */
export function execute(...operations) {
  const initialState = {
    references: [],
    data: null,
  };

  return state => {
    return commonExecute(...operations)({
      ...initialState,
      ...state,
    });
  };
}

/**
 * Creates a fictional resource in a fictional destination system using a POST request
 * @public
 * @example
 * addContact({
 *   name: "Mamadou",
 *   language: "ENG",
 *   urns: ["tel:+250788123123"]
 * });
 * @function
 * @param {object} params - data to create the new resource
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export function addContact(params, callback) {
  return state => {
    params = expandReferences(params)(state);

    const { host, apiVersion, token } = state.configuration;

    const url = `${host}/api/${apiVersion || 'v2'}/contacts.json`;

    const config = {
      url,
      body: params,
      headers: { Authorization: `Token ${token}` },
    };

    return http
      .post(config)(state)
      .then(response => {
        console.log('Contact added with uuid:', response.data.uuid);
        const nextState = {
          ...composeNextState(state, response.data),
          response,
        };
        if (callback) return callback(nextState);
        return nextState;
      });
  };
}

/**
 * Create a fictional patient in a fictional universe with a fictional REST api
 * @public
 * @example
 * startFlow({
 *   flow: "f5901b62-ba76-4003-9c62-72fdacc1b7b7",
 *   restart_participants: false,
 *   contacts: ["a052b00c-15b3-48e6-9771-edbaa277a353"]
 * });
 * @function
 * @param {object} params - data to create the new resource
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export function startFlow(params, callback) {
  return state => {
    params = expandReferences(params)(state);

    const { host, apiVersion, token } = state.configuration;

    const url = `${host}/api/${apiVersion || 'v2'}/flow_starts.json`;

    const config = {
      url,
      data: params,
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    };

    return http
      .post(config)(state)
      .catch(error => {
        console.log(error.response);
        throw 'That was an error from RapidPro.';
      })
      .then(response => {
        console.log('Flow started:', response.data);
        const nextState = {
          ...composeNextState(state, response.data),
          response,
        };
        if (callback) return callback(nextState);
        return nextState;
      });
  };
}

/**
 * Create a fictional patient in a fictional universe with a fictional REST api
 * @public
 * @example
 * startFlow({
 *   flow: "f5901b62-ba76-4003-9c62-72fdacc1b7b7",
 *   restart_participants: false,
 *   contacts: ["a052b00c-15b3-48e6-9771-edbaa277a353"]
 * });
 * @function
 * @param {object} params - data to create the new resource
 * @param {function} callback - (Optional) callback function
 * @returns {Operation}
 */
export function sendBroadcast(params, callback) {
  return state => {
    params = expandReferences(params)(state);

    const { host, apiVersion, token } = state.configuration;

    const url = `${host}/api/${apiVersion || 'v2'}/flow_starts.json`;

    const config = {
      url,
      data: params,
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    };

    return http
      .post(config)(state)
      .catch(error => {
        console.log(error.response);
        throw 'That was an error from RapidPro.';
      })
      .then(response => {
        console.log('Flow started:', response.data);
        const nextState = {
          ...composeNextState(state, response.data),
          response,
        };
        if (callback) return callback(nextState);
        return nextState;
      });
  };
}

// What functions do you want from the common adaptor?
export {
  alterState,
  fn,
  dataPath,
  dataValue,
  each,
  field,
  fields,
  http,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';

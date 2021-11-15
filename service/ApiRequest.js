import { buildEndpointConfig } from "./ApiUtils.js";

/**
 * The base class for Requests
 *
 * @class ApiRequest
 */
export default class ApiRequest {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }
  /**
   * Builds an Http Request header based on the user defined headers of the default headers
   *
   * @param {*} parameters an object contains the authorization token and configs
   * @returns an http Header object with corresponding properties defined
   * @memberof ApiRequest
   */
  buildHeaders = (parameters) => {
    const { token, noAuth } = parameters;
    const endpointConfig = buildEndpointConfig(this.endpoint, parameters);
    const { OVERRIDE_HEADER } = endpointConfig;
    const headers = new Headers();
    const appendHeaders = OVERRIDE_HEADER || {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (!noAuth) {
      appendHeaders.Authorization = `Bearer ${token}`;
    }
    Object.keys(appendHeaders).forEach((key) => {
      headers.append(key, appendHeaders[key]);
    });
    return headers;
  };
  /**
   * The main method for calling a fetch request to the API
   *
   * @param {*} requestUrl an Http URL object
   * @param {*} options object to be passed into the fetch request
   * contains the Http method, headers, and body
   * @memberof ApiRequest
   */
  callApi = (requestUrl, options) => {
    const { successCallback, errorCallback } = this.endpoint;
    fetch(requestUrl, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Status code: [${response.status}] - ${response.statusText}`
          );
        }
        const type = response.headers.get("Content-Type") || "";
        return type.includes("application/json")
          ? response.json()
          : { statusCode: response.status, status: response.statusText };
      })
      .then((result) => {
        if (successCallback) {
          successCallback({ detail: { result } });
        } else {
          console.info(">>>>>>>>>Result: ", result);
        }
      })
      .catch((error) => {
        if (errorCallback) {
          console.error(">>>>>>>>>Error: ", error);
          errorCallback({
            detail: {
              error: {
                name: "ApiError",
                message: [
                  `Encountered error calling API: ${requestUrl}`,
                  error.message,
                ],
              },
            },
          });
        } else {
          console.error(">>>>>>>>>Error: ", error);
        }
      });
  };
}

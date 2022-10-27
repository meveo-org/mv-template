import ApiRequest from "./ApiRequest.js";
import { buildApiUrl, buildRequestParameters } from "./ApiUtils.js";

/**
 * The ApiRequest for GET requests
 *
 * @class GetRequest
 * @extends {ApiRequest}
 */
export default class GetRequest extends ApiRequest {
  constructor(endpoint) {
    super(endpoint);
  }
  /**
   * Concrete implementation of the executeRequest interface specifically for Http GET requests
   *
   * @param {*} parameters
   * @memberof GetRequest
   */
  executeRequest(parameters) {
    const { mock } = this.endpoint;
    const requestParameters = buildRequestParameters(this.endpoint, parameters);
    const parameterKeys = Object.keys(requestParameters || {});
    const hasParameters = requestParameters && parameterKeys.length > 0;
    const apiUrl = buildApiUrl(this.endpoint, parameters);
    const requestUrl = new URL(apiUrl, window.location.origin);
    if (hasParameters) {
      parameterKeys.forEach(function (key) {
        requestUrl.searchParams.append(key, requestParameters[key]);
      });
    }
    if (mock) {
      requestUrl.searchParams.append("mock", true);
    }
    const headers = this.buildHeaders(parameters);
    const options = { method: "GET", headers };
    this.callApi(requestUrl, options);
  }
}

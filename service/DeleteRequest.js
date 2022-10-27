import ApiRequest from "./ApiRequest.js";
import { buildApiUrl, buildRequestParameters } from "./ApiUtils.js";

/**
 * The ApiRequest for DELETE requests
 *
 * @class DeleteRequest
 */
export default class DeleteRequest extends ApiRequest {
  constructor(endpoint) {
    super(endpoint);
  }
  /**
   * Concrete implementation of the executeRequest interface specifically for Http DELETE requests
   *
   * @param {*} parameters
   * @memberof DeleteRequest
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
    const options = { method: "DELETE", headers };
    this.callApi(requestUrl, options);
  }
}

import ApiRequest from "./ApiRequest.js";
import { buildApiUrl, buildRequestParameters } from "./ApiUtils.js";

/**
 * The ApiRequest for PUT requests
 *
 * @class PutRequest
 */
export default class PutRequest extends ApiRequest {
  constructor(endpoint) {
    super(endpoint);
  }
  /**
   * Concrete implementation of the executeRequest interface specifically for Http PUT requests
   *
   * @param {*} parameters
   * @memberof PutRequest
   */
  executeRequest(parameters) {
    const { mock } = this.endpoint;
    const requestParameters = buildRequestParameters(this.endpoint, parameters);
    const apiUrl = buildApiUrl(this.endpoint, parameters);
    const requestUrl = new URL(apiUrl, window.location.origin);
    if (mock) {
      requestUrl.searchParams.append("mock", true);
    }
    const headers = this.buildHeaders(parameters);
    const body = JSON.stringify(requestParameters);
    const options = {
      method: "PUT",
      headers,
    };
    if (body) {
      options.body = body;
    }
    this.callApi(requestUrl, options);
  }
}

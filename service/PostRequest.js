import ApiRequest from "./ApiRequest.js";
import { buildApiUrl, buildRequestParameters } from "./ApiUtils.js";

/**
 * The ApiRequest for POST requests
 *
 * @class PostRequest
 */
export default class PostRequest extends ApiRequest {
  constructor(endpoint) {
    super(endpoint);
  }
  /**
   * Concrete implementation of the executeRequest interface specifically for Http POST requests
   *
   * @param {*} parameters
   * @memberof PostRequest
   */
  executeRequest(parameters) {
    const { mock } = this.endpoint;
    const requestParameters = buildRequestParameters(this.endpoint, parameters);
    const apiUrl = buildApiUrl(this.endpoint, parameters);
    if (mock) {
      requestUrl.searchParams.append("mock", true);
    }
    const headers = this.buildHeaders(parameters);
    const body = JSON.stringify(requestParameters);
    const options = {
      method: "POST",
      headers,
    };
    if (body) {
      options.body = body;
    }
    this.callApi(apiUrl, options);
  }
}

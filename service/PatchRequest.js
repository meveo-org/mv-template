import ApiRequest from "./ApiRequest.js";
import { buildApiUrl, buildRequestParameters } from "./ApiUtils.js";

/**
 * The ApiRequest for PATCH requests
 *
 * @class PatchRequest
 */
export default class PatchRequest extends ApiRequest {
  constructor(endpoint) {
    super(endpoint);
  }
  /**
   * Concrete implementation of the executeRequest interface specifically for Http PUT requests
   *
   * @param {*} parameters
   * @memberof PatchRequest
   */
  executeRequest(parameters) {
    const { mock } = this.endpoint;
    const requestParameters = buildRequestParameters(this.endpoint, parameters);
    const apiUrl = buildApiUrl(this.endpoint, parameters);
    const requestUrl = new URL(apiUrl);
    if (mock) {
      requestUrl.searchParams.append("mock", true);
    }
    const headers = this.buildHeaders(parameters);
    const body = JSON.stringify(requestParameters);
    const options = {
      method: "PATCH",
      headers,
    };
    if (body) {
      options.body = body;
    }
    this.callApi(requestUrl, options);
  }
}

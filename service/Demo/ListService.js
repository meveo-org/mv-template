import EndpointInterface from "../EndpointInterface.js";

class ListService extends EndpointInterface {
	constructor() {
		super("Demo", "GET", "LIST");
	}
}

export default new ListService();
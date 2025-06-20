import { HTTP_METHOD } from "../../utils/constants";
import api from "./api";

const fetch = (url, method, body = {}, config = {}) => {
    switch (method) {
        case HTTP_METHOD.GET:
            return api.get(url, config);
        case HTTP_METHOD.POST:
            return api.post(url, body, config);
        case HTTP_METHOD.PUT:
            return api.put(url, body, config);
        case HTTP_METHOD.DELETE:
            return api.delete(url, { ...config, data: body });
        default:
            throw new Error(`Unsupported method: ${method}`);
    }
};

export const callApi = ({ url, method, params, body }) => {
    let config = params ? { params } : {};
    return fetch(url, method, body, config);
};

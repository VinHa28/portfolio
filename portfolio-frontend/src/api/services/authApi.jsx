import { HTTP_METHOD } from "utils/constants";
import { callApi } from "../config/callApi";
import { url } from "./url";

const authApi = {
    login: (body) =>
        callApi({
            url: url.login,
            method: HTTP_METHOD.POST,
            body,
        }),
    logout: (body) =>
        callApi({
            url: url.logout,
            method: HTTP_METHOD.POST,
            body,
        }),
    requestOtp: (body) =>
        callApi({
            url: url.requestOtp,
            method: HTTP_METHOD.POST,
            body,
        }),
    verifyOtp: (body) =>
        callApi({
            url: url.verifyOtp,
            method: HTTP_METHOD.POST,
            body,
        }),
};
export default authApi;

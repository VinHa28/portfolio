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
        
};
export default authApi;

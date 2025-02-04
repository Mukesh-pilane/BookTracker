import { privateRequest } from "../../../lib/axiosConfig/privateRequest";
import { CATEGORY } from "../../../utility/apiEndPoints"
import { getApiQuery } from "../../../utility/getApiQuery";

export const getCategory =  (params) => {
    const query =  getApiQuery(params)
    return  privateRequest.get(CATEGORY, query);
};

export const addCategory =  (data) => {
    return  privateRequest.post(CATEGORY, data);
};
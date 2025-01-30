import { privateRequest } from "../../../lib/axiosConfig/privateRequest";
import { BOOK } from "../../../utility/apiEndPoints"
import { getApiQuery } from "../../../utility/getApiQuery";

export const getBooks =  (params) => {
    const query =  getApiQuery(params)
    return  privateRequest.get(BOOK, query);
};
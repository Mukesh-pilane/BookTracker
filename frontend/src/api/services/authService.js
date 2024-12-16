import { publicRequest } from "../axiosConfig/publicRequest";
import { LOGIN } from "../apiEndPoints"
import { showErrorNotification } from '../../utility';


export const loginUser = (user) => {
    return publicRequest.post(LOGIN, user).then((res) => res.data.data).catch(error => showErrorNotification(error.response.data.message));
};

const { fetchUser, signupservice } = require('./user.service');
const response = require('../../utils/response');

module.exports.fetchDeveloper = async (req, res) => {
    const roleName = req.url.substring(1, req.url.length-1);
    const currentUserId = req.userData.id;
    const { search } = req.query;
    const result = await fetchUser({ search, roleName, currentUserId });
    return response.ok(res, result);
}

module.exports.fetchManager = async (req, res) => {
    const { search } = req.query;
    const result = await fetchUser({ search });
    if(result.error){
        return res.status(result.status).send(result);
    }
    return res.status(result.status).send(result);
}

module.exports.createUser = async (req, res) => {
    const { userName, email, password } = req.body;
    const userData = { userName, email, password };
    const result = await signupservice(userData);
    return response.ok(res, result);
}

module.exports.updateUser = async (req, res) => {
    const result = await signupservice(req);
    return response.ok(res, result);
}
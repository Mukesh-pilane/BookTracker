const authservice = require('./auth.service');
const response = require('../../utils/response');

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    const logInData = { email, password };
    const result = await authservice.loginservice(logInData);
    return response.ok(res, result);
}

module.exports.logout = async (req, res) => { 
    let token = req.headers.authorization;
    const { id } = req.userData;
    const logOutData = { id, token };
    const result = await authservice.logoutservice(logOutData);
    return response.ok(res, result);
}

exports.sendResetPasswordLink = async (req, res) => {
    const { email } = req.body;
    const sendEmail = await authservice.requestResetPasswordLink(email);
    return response.ok(res, sendEmail);
};

exports.resetPassword = async (req, res) => {
    const resetPass = await authservice.resetPassword(req.path, req.body);
    return response.ok(res, resetPass);
};
  
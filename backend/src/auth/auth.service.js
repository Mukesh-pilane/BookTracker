const db = require('../../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const client = require('../../config/redis');
const { ValidationError, DataNotFoundError, BadRequestError } = require('../../utils/customError');
const sendEmail = require('../../utils/email');

exports.loginservice = async (logInData) => {
    const { email, password } = logInData;
    if (!password) {
        throw new BadRequestError('please fill the password');
    }
    const userExist = await db.user.findOne({
        email: email
    });
    if (!userExist) {
        throw new DataNotFoundError(`User not found with Email ${email}`);
    };
    const validPassword = await bcrypt.compare(password + "", userExist.password);
    if (!validPassword) {
        throw new ValidationError('Invalid Email or Password');
    }

    const token = jwt.sign({ userid: userExist.id }, process.env.PRIVATE_KEY, { expiresIn: "24h" });
    // check if user already have token
    const userToken = await db.userToken.findOne({
        userId: userExist._id
    })

    if (userToken) {
        await db.userToken.findOneAndUpdate(
            { userId: userExist.id },
            { token: token }
        );
    }
    else {
        await db.userToken.create({
            userId: userExist.id,
            token: token
        });
    }
    return {
        error: false,
        message: "Logged In Successfully",
        data: token
    }
}

exports.logoutservice = async (logOutData) => {
    const { id, token } = logOutData;

    const result = await db.userToken.deleteOne({
        userId: id
    });
    await client.del(token); // also delete from redis
    if (!result) {
        return {
            error: false,
            message: "User Already Logged Out"
        }
    }

    return {
        error: false,
        message: "Logged Out Successfully"
    }
}

exports.requestResetPasswordLink = async (email) => {
    const userExist = await db.user.findOne({
        email: email
    });
    if (!userExist) {
        throw new DataNotFoundError(`User not found with Email ${email}`);
    };

    // genating reset token for reset password
    const resetToken = jwt.sign({ userid: userExist.id }, process.env.PRIVATE_KEY, { expiresIn: "15m" });

    const resetUrl = new URL(
        `/auth/reset-password/${resetToken}`,
        "http://localhost:3000"
    ).toString();

    const htmlContent = `
    <p style="font-family: Arial, sans-serif; color: #333; font-size: 16px; line-height: 1.5; margin: 0;">
      You requested a password reset for your account. Click the button below to reset your password. The link will expire in 15 minutes.
    </p>
    <p style="text-align: center; margin: 20px 0;">
      <a href="${resetUrl}" 
         style="display: inline-block; padding: 12px 20px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 4px;">
        Reset Password
      </a>
    </p>
    <p style="font-family: Arial, sans-serif; color: #333; font-size: 16px; line-height: 1.5; margin: 20px 0 0;">
      If you did not request this password reset, please ignore this email or contact support if you have any questions.
    </p>
    <p style="font-family: Arial, sans-serif; color: #777; font-size: 14px; text-align: center; margin: 20px 0 0;">
      Thank you,<br>
      The Zenput Team<br>
      <a href="${process.env.URL || "http://localhost:3000"
        }" style="color: #007bff; text-decoration: none;">Visit our website</a>
    </p>
    `;

    await sendEmail(userExist.email, "Password Reset", htmlContent);

    return {
        error: false,
        message: "Password reset email sent."
    };
};

exports.resetPassword = async (path, body) => {
    const { newPassword } = body;

    path = path.split("/");
    const resetToken = path[path.length - 1];

    const decoded = jwt.verify(resetToken, process.env.PRIVATE_KEY);

    if (!decoded) {
        throw new BadRequestError("Invalid reset token");
    }
    const user = await db.user.findOneAndUpdate(
        { _id: decoded.userid },
        { password: newPassword }
    );

    if (!user) {
        throw new DataNotFoundError(`User not found with ID ${decoded.userid}`);
    }

    return {
        error: false,
        message: "Password reset successfully"
    }
};
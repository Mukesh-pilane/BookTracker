const db = require('../../models/index');
const { Op } = require('sequelize');

const { BadRequestError } = require('../../utils/customError');


module.exports.fetchUser = async(data) => {
    try {
        const { search = "" } = data;
        
        const searchObj = { [Op.like]: `%${search}%` };

        // find records other than blocked records
        const result = await User.find(
            {
                email: searchObj,
            }
        ).select('firstName lastName email _id');
        if(!result){
            return { error : true, status : 404, message : "Data Not Found"}; 
        }
        return { error : false, status : 200, data : result, message : "Data Found"};
    }
    catch (err) {
        return { error : true, status : 500, message : "Internal Server Error"}; 
    }
}

exports.signupservice = async (userData) =>{
    const { userName, email, password } = userData;
    if(!password){
        throw new BadRequestError('please fill the password');
    }
    
    console.log('db', db)
    const userExist = await db.user.findOne({
        email : email
    });
    if(userExist){
        throw new BadRequestError('user with this email already exist');
    };
    const result = await db.user.create({
        userName, 
        email, 
        password, 
    });
    if(result){
        return {
            error: false,
            result: 'New User Added',
            status: 201
        }
    }
    else{
        throw new BadRequestError("Internal Server Error");
    }
}
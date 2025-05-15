import jwt from 'jsonwebtoken'
import MemberModel from '../../models/member/MemberSchema.js';
const loginMember = async (req,res)=>{
    try {
     const {username, password} =  req.body;
     const {email, passkey} = MemberModel.findOne({email:username})
     if(username === email && password === passkey ){
           const token = jwt.sign (username+password,process.env.JWT_SECKRET) 

           res.json({success:true,cocirculertoken:`${token}`, message:"You are login"});
     }
else {
        // console.log("Invalid cridencial")
       res.json({success:false,message:"Invalid cridencial" })
}
       
    } catch (error) {
    //    console.log(error)
       res.json({success:false, msg:`member login ${error.message}`})
    }
}
export default loginMember
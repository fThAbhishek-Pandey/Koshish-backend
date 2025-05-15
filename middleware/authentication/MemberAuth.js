import jwt from 'jsonwebtoken'
//  member authentication middlewre
const authMember = async (req,res,next)=>{
   
      try{
            const {authmembertoken} = req.headers;
            if(!authmembertoken){
                return res.json({sucess:false,authmembertoken:`${authmembertoken}`, message:"Web token is Null or undefined"})
            }
            const tokenDecode= jwt.verify(authmembertoken, process.env.JWT_SECKRET)
            
            if( tokenDecode !== process.env.COCICULAR_USERNAME + process.env.COCICULAR_PASSWORD ){
                return res.json({sucess:false, message:"Not Authorized Login again"})
            }
            // return res.json({success: true, message:"you are login" })
            next();
      }
      catch(error){
        //  console.log(error);
         res.json({sucess: false, message: error.message})
      }
}
export default authCociculer;
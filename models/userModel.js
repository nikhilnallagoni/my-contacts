const mongoose=require('mongoose');
const userSchema=new mongoose.Schema(
    {
        username:
        {
            type:String,
            required:[true,"please add the username"],
        },
        email:
        {
            type:String,
            required:[true,"please enter the email"],
            unique:[true,"email already taken!"],
        },
        password:
        {
            type :String,
            required:[true,"please enter password"],
        }
    },
    {
        timestamps:true,
    }
)
module.exports=mongoose.model('User',userSchema);
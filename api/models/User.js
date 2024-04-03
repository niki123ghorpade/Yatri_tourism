import mongoose from 'mongoose';
const {Schema}=mongoose;
const UserSchema=new mongoose.Schema(
    {
      fullname: {
        type: String,
        required: true,
      },
    username:{
    type:String,
    required:true,
    unique:true
    },
        email:{
        type:String,
        required:true,
        unique:true
        },
    password:{
        type:String,
        required:true,
        },
       
          img: {
            type: String,
          },

          phone: {
            type: String,
            required: true,
        //    validate:{
          //    validator:async function (value) {
            //    const user=await this.constructor.findOne({phone:value});
             //   return !user;
              //},
             // message:props=>`${props.value} is already associated with another account`
                
              //}
      
          },

     isAdmin:{
             type:Boolean,
            
         },
        securityQuestion: {
          type: String,
          required: false
      },
      securityAnswer: {
          type: String,
          required: false
      }
},{timestamps:true});
export default mongoose.model("User",UserSchema);
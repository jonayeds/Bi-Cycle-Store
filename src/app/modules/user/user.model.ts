import { model, Schema } from "mongoose";
import { IUser, IUserModel, TName } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";


const nameSchema = new Schema<TName>({
    firstName:{
        type:String,
        required:true
    },
    middleName:{
        type:String,
    },
    lastName:{
        type:String,
        required:true
    }
})


const userSchema = new Schema<IUser, IUserModel>({
    name:{
        type:nameSchema,
        required:true
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
    role:{
        type:String,
        enum:["admin", "customer"],
        default:"customer"
    }

},{
    timestamps:true
})

// Pre save middleware
userSchema.pre("save", async function(next){
// Hashing password and save into DB
  this.password = await bcrypt.hash(this.password, Number(config.salt_rounds));
  next();
})


// post save middleware
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
  });


//   static methods
  userSchema.statics.isUserExistsByEmail = async function (email: string) {
    return await User.findOne({ email }).select('+password');
  };
  
  userSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword,
  ) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  };



export const User = model<IUser, IUserModel>("User", userSchema)
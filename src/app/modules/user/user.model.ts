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
    },
    isBlocked:{
      type:Boolean,
      default:false
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
  userSchema.statics.isUserExists = async function (id: string) {
    return await User.findById(id).select('+password');
  };
  
  userSchema.statics.hashPassword = async function (password: string) {
    const pass = await bcrypt.hash(password, Number(config.salt_rounds));
    return pass
  };
  
  userSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword,
  ) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  };



export const User = model<IUser, IUserModel>("User", userSchema)
const bcrypt = require('bcrypt');
const {Schema, model} = require('mongoose');

// Define the User schema with fields for name, email, and password
const userSchema = new Schema({
    name:{
        type : Schema.Types.String,
        required : true,
        trim: true
    },
    email:{
        type: Schema.Types.String,
        required: this,
        trim:true,
        unique:true
    },
    password:{
        type: Schema.Types.String,
        required:true,
        select:false,
    }
},{
    timestamps:true
})

// Instance method to compare entered password with hashed password in DB
userSchema.methods.isPasswordMatch = async function(password){
    return bcrypt.compare(password,this.password);
}

// Pre-save hook to hash the password before saving it to the database
userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,8);
    }
    next();
});

// Create the User model using the defined schema
const UserModel = model('User', userSchema);

module.exports = UserModel;
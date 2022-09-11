const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: String,
  password: { type: String, maxLength: [7, "Paswword must be 7 characters long"] },
  first_name: String,
  last_name: String,
  company_id: mongoose.Schema.Types.ObjectId,
  isAdmin: { type: Boolean, default: false }


}, { timestamps: true });

//  hash password here before save to db
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password'))
    return next();
  this.password = await bcrypt.hash(this.password, 12);

})
// model
const User = mongoose.model('User', UserSchema);

module.exports = User;
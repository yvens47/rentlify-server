const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({

  company_name: String,
  address: {},
  users: [],
  registered_tenants: []


}, { timestamps: true });
// model
const Company = mongoose.model('Company', CompanySchema);

module.exports = User;

import { genders, nationalities, plans } from '../../shared/constants';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const Schema = mongoose.Schema;

const schema = new Schema({

  rol: { type: String, default: 'user' },

  email: { type: String, unique : true, required: true },
  password: { type: String, default: '' },

  first_name: { type: String },
  last_name: { type: String },
  phone: String,

  facebook_id: String,

  picture: {
    data: {
      url: String
    }
  },

  avatar: String,

  birthdate: Date,

  nationality: { type: String, enum: nationalities },
  country: String,

  address_street: String,
  address_number1: String,
  address_number2: String,
  address_city: String,
  address_state: String,
  address_zip_code: String,

  civil_status: String,
  job: String,

  cuit: String,

  document_type: { type: String, default: 'DNI' },
  document_number: String,

  gender: { type: String, enum: genders },

  verified: { type: Boolean, default: false },

  document_image: String,
  contact_info: String,

  created_at: { type: Date, default: Date.now, required: true },
  updated_at: { type: Date, default: Date.now, required: true },
  deleted_at: { type: Date },

  plan: { type: String, enum: plans },
  terms_accepted: { type: Boolean, default: false }

});

schema.pre('save', function(next) {
  let user = this;
  if (user.isModified('password') || user.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) { return next(err) }
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) { return next(err) }
        user.password = hash;
        next();
      });
    });
  }
  else {
    return next();
  }
});

schema.methods.comparePassword = function(passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

export default mongoose.model('User', schema);

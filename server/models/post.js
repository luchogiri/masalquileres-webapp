import {
  menores,
  types,
  currencies,
  calefaccion,
  periodos,
  tipo_expensas,
  mascotas,
  tipo_fianza,
  horarios
} from '../../shared/constants';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({

  title: String,
  description: String,

  type: { type: String, enum: types },
  years: { type: Number, min: 0 },

  total_area: { type: Number, min: 0 },
  covered_area: { type: Number, min: 0 },
  semicubierta_area: { type: Number, min: 0 },
  descubierta_area: { type: Number, min: 0 },
  terreno: { type: Number, min: 0 },

  plantas: { type: Number, min: 0 },
  rooms: { type: Number, min: 0 },
  dormitories: { type: Number, min: 0 },
  bathrooms: { type: Number, min: 0 },
  parking: { type: Number, min: 0 },

  calefaccion: { type: String, enum: calefaccion },

  orientacion: String,

  situacion: String,

  periodo: { type: String, enum: periodos },
  porcentaje: { type: Number, min: 0 },

  maxcontrato: { type: Number, min: 0 },

  state: String,
  expensas: { type: Number, min: 0 },
  tipo_expensas: { type: String, enum: tipo_expensas },

  abl: { type: Number, min: 0 },
  tipo_abl: { type: String, enum: tipo_expensas },

  mascotas: { type: String, enum: mascotas },
  tipo_fianza: { type: String, enum: tipo_fianza },
  menores: { type: String, enum: menores },

  horarios: { type:String, enum: horarios },

  location: {
    full_address: String,
    country: String,
    state: String,
    city: String,
    neighborhood: String,
    street: String,
    street_number: String,
    section: String,
    geolocation: {
      type: [ Number ],
      index: '2d'
    }
  },

  private_description: { type: String },

  // services: [String],
  // amenities: [String],

  service_type: String,
  availability: String,

  warranty_owner: { type: Boolean, default: false },
  surety_insurance: { type: Boolean, default: false },

  contact_phone: String,
  price: Number,
  currency: { type: String, enum: currencies },

  deposito: { type: Number, min: 0 },

  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  published: { type: Boolean, default: false },
  verified: { type: Boolean, default: false },

  uploads: [ {
    originalname: String,
    encoding: String,
    mimetype: String,
    filename: String,
    path: String,
    size: String,
    url: String
  } ],

  video: String,

  img1: String,
  img2: String,

  created_at: { type: Date, default: Date.now, required: true },
  updated_at: { type: Date, default: Date.now, required: true },
  deleted_at: { type: Date },

});

export default mongoose.model('Post', schema);

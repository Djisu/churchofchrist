import mongoose from 'mongoose'

const memberSchema = new mongoose.Schema(
  {
    surname: { type: String, required: true },
    other_names: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: Date, required: true },
    marital_status: { type: String, required: true },
    telno: { type: String },
    res_address: { type: String, required: true },
    occupation: { type: String, required: true },
    place_of_work: { type: String },
    location_of_work: { type: String },
    emergency_contact_name: { type: String },
    emergency_contact_no: { type: String },
    description: { type: String },
    image: { type: String },
    gpAddress: { type: String },
  },
  {
    timestamps: true,
  },
)
const Member = mongoose.model('Member', memberSchema)
export default Member

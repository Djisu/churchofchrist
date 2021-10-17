import mongoose from 'mongoose'

const visitorSchema = new mongoose.Schema(
  {
    surname: { type: String, required: true },
    other_names: { type: String, required: true },
    telno: { type: String },
    res_address: { type: String, required: true },
    occupation: { type: String, required: true },
    place_of_work: { type: String },
  },
  {
    timestamps: true,
  },
)
const Member = mongoose.model('Visitor', visitorSchema)
export default Member

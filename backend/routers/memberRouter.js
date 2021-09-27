import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import data from '../data.js'
import Member from '../models/memberModel.js'
import { isAdmin, isAuth } from '../utils.js'

const memberRouter = express.Router()

memberRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    console.log('in memberRoute.get', req.query.other_names)
   /*  const other_names = req.query.other_names || ''
    //const seller = req.query.seller || '';
    const other_namesFilter = other_names
      ? { other_names: { $regex: other_names, $options: 'i' } }
      : {} */
    // const sellerFilter = seller ? { seller } : {};
    const members = await Member.find({})

    res.send(members)
  }),
)

memberRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    await Member.remove({})
    const createdMembers = await Member.insertMany(data.members)
    res.send({ createdMembers })
  }),
)

memberRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const member = await Member.findById(req.params.id)
    if (member) {
      res.send(member)
    } else {
      res.status(404).send({ message: 'Members not found' })
    }
  }),
)

//'/api/members'
memberRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    console.log('in in in in')
    const member = new Member({
      surname: 'sample surname',
      other_names: 'sample other name',
      gender: 'sample Female',
      dob: '08 / 03 / 1998',
      marital_status: 'single',
      telno: '0249221188',
      res_address: 'House No. 25, Spintex Road, Tema',
      occupation: 'Nurse',
      place_of_work: 'Ridge Hospital',
      location_of_work: 'Ridge, Accra',
      emergency_contact_name: 'John Mensah',
      emergency_contact_no: '0234564323',
      description:
        'sample A young and energietic person full of grace and truth',
      image: '/images/passport7.jpg',
      gpAddress: '373-543-123',
    })
    const crestedMember = await member.save()
    res.send({ message: 'Member Created', member: crestedMember })
  }),
)

memberRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const memberId = req.params.id
    const member = await Member.findById(memberId)

    if (member) {
      member.surname = req.body.surname
      member.other_names = req.body.other_names
      member.gender = req.body.gender
      member.dob = req.body.dob
      member.marital_status = req.body.marital_status
      member.telno = req.body.telno
      member.res_address = req.body.res_address
      member.occupation = req.body.occupation
      member.place_of_work = req.body.place_of_work
      member.location_of_work = req.body.location_of_work
      member.emergency_contact_name = req.body.emergency_contact_name
      member.emergency_contact_no = req.body.emergency_contact_no
      member.description = req.body.description
      member.image = req.body.image
      member.gpAddress = req.body.gpAddress

      const updatedMember = await member.save()
      res.send({ message: 'Member Updated', member: updatedMember })
    } else {
      res.status(404).send({ message: 'Member not found' })
    }
  }),
)

memberRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const member = await Member.findById(req.params.id)

    if (member) {
      const deletedMember = await member.remove()
      res.send({ message: 'Member Deleted', member: deletedMember })
    } else {
      res.status(404).send({ message: 'Member not found' })
    }
  }),
)
export default memberRouter

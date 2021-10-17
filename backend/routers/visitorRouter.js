import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import data from '../data.js'
import Visitor from '../models/visitorModel.js'
import { isAdmin, isAuth } from '../utils.js'

const visitorRoute = express.Router()

visitorRoute.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    console.log('in visitorRoute.get', req.params.surname)

    const surname = req.query.surname || ''

    const surnameFilter = surname
      ? { surname: { $regex: surname, $options: 'i' } }
      : {}
    // const sellerFilter = seller ? { seller } : {};
    const visitors = await Visitor.find({
      ...surnameFilter,
    })

    res.send(visitors)
  }),
)

visitorRoute.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    await Visitor.remove({})
    const createdVisitors = await Visitor.insertMany(data.visitors)
    res.send({ createdVisitors })
  }),
)

visitorRoute.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    console.log('WHO ARE YOU?')
    const visitor = await Visitor.findById(req.params.id)
    if (visitor) {
      res.send(visitor)
    } else {
      res.status(404).send({ message: 'Visitor not found' })
    }
  }),
)

visitorRoute.get(
  '/:surname',
  expressAsyncHandler(async (req, res) => {
    console.log('in visitorRoute.get', 'kofi is good')

    if (!req) {
      console.log('No req found')
      return
    }

    const visitor = await Visitor.find({ surname: req.params.surname })
    if (visitor) {
      console.log('visitor found', visitor)

      res.send(visitor)
    } else {
      res.status(404).send({ message: 'Visitor not found' })
    }
  }),
)
//'/api/visitor'
visitorRoute.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    console.log('in in in in')
    const visitor = new Visitor({
      surname: 'sample surname',
      other_names: 'sample other name',
      telno: '0249221188',
      res_address: 'House No. 25, Spintex Road, Tema',
      occupation: 'Nurse',
      place_of_work: 'Ridge Hospital',
    })
    const createdVisitor = await visitor.save()
    res.send({ message: 'Visitor Created', visitor: createdVisitor })
  }),
)

visitorRoute.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    console.log('in visitorRoute.put', req.body)

    const visitorId = req.params.id
    const visitor = await Visitor.findById(visitorId)

    if (visitor) {
      visitor.surname = req.body.surname
      visitor.other_names = req.body.other_names
      visitor.telno = req.body.telno
      visitor.res_address = req.body.res_address
      visitor.occupation = req.body.occupation
      visitor.place_of_work = req.body.place_of_work

      const updatedvisitor = await visitor.save()
      res.send({ message: 'Visitor Updated', visitor: updatedvisitor })
    } else {
      res.status(404).send({ message: 'Visitor not found' })
    }
  }),
)

visitorRoute.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const visitor = await Visitor.findById(req.params.id)

    if (visitor) {
      const deletedVisitor = await visitor.remove()
      res.send({ message: 'Visitor Deleted', visitor: deletedVisitor })
    } else {
      res.status(404).send({ message: 'Visitor not found' })
    }
  }),
)
export default visitorRoute

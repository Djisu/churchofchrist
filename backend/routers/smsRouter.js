/* import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import data from '../data.js'
import Member from '../models/memberModel.js'
import { isAdmin, isAuth } from '../utils.js'
import TeleSignSDK from 'telesignsdk'

const smsRouter = express.Router()

smsRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const smsMessage = req.message
    const memberTelnos = new Member.find({}, { telno: true })

    var client = new TeleSignSDK(
      '7C4D06BD-B85E-4CFF-9727-2CE1FC414AD4',
      'JtnHQt/BROJ8VULABWRQTcYXul8WAiop8FTe4Uf9ajJe5nxZbOj5Qmh8ofCwBLcAtAwcdKzRa7cfK+o5iRoSQw==',
    )

    callback = function (err, resBody) {
      if (err) {
        console.error(err)

        res.status(404).send({ message: 'Error in sending message' })
      } else {
        console.log('success!!!')
        console.log(resBody)

        res.send({ message: 'Message sent successfully' })
      }
    }

    memberTelnos.forEach((memberTelno) => {
      client.sms.message(callback, memberTelno.telno, smsMessage, 'MKT')
    })
  }),
)

export default smsRouter
//'Hello Mr Djesu, sms from Mr Fleischer. This is for testing the system',//
/* var client = new TeleSignSDK(
  '7C4D06BD-B85E-4CFF-9727-2CE1FC414AD4',
  'JtnHQt/BROJ8VULABWRQTcYXul8WAiop8FTe4Uf9ajJe5nxZbOj5Qmh8ofCwBLcAtAwcdKzRa7cfK+o5iRoSQw==',
)

callback = function (err, resBody) {
  if (err) {
    console.error(err)
  } else {
    console.log('success!!!')
    console.log(resBody)
  }
}

client.sms.message(
  callback,
  '233201123253',
  'Hello Mr Djesu, sms from Mr Fleischer. This is for testing the system',
  'MKT',
)
 */

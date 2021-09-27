var https = require('follow-redirects').https

var options = {
  method: 'POST',
  hostname: 'api.sms.to',
  path: '/sms/send',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer <YOUR_API_KEY_OR_ACCESS_TOKEN>',
  },
  maxRedirects: 20,
}

var req = https.request(options, function (res) {
  var chunks = []

  res.on('data', function (chunk) {
    chunks.push(chunk)
  })

  res.on('end', function (chunk) {
    var body = Buffer.concat(chunks)
    console.log(body.toString())
  })

  res.on('error', function (error) {
    console.error(error)
  })
})

var postData =
  '{\n    "message": "This is test",\n    "list_id": 1,\n    "sender_id": "SMSto",\n    "callback_url": "https://example.com/callback/handler"\n}'

req.write(postData)

req.end()

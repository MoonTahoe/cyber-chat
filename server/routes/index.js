import { Router } from 'express'
const router = Router()

const createPage = () => `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="minimum-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no" />
  <meta charset="utf-8">
  <link rel="icon" type="image/ico" href="/favicon.ico">
  <title>Cyber Chat</title>
</head>
<body>
  <div id="react-container"></div>
  <script src="assets/bundle.min.js"></script>
</body>
</html>`

router.get('/', (req, res) => {
    res.status = 200
    res.send(createPage())
})

module.exports = router
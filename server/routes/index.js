import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { App } from '../../components'
import { Router } from 'express'
import initialState from '../../data/client'
import storeFactory from '../../store'

const store = storeFactory(false, initialState)

const router = Router()

const createPage = (html, state) => `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="minimum-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no" />
  <meta charset="utf-8">
  <link rel="icon" type="image/ico" href="/favicon.ico">
  <title>Cyber Chat</title>
</head>
<body>
  <div id="react-container">${html}</div>
  <script>
    window.__INITIAL_STATE__ = ${JSON.stringify(state)}
  </script>
  <script src="assets/bundle.min.js"></script>
</body>
</html>`

router.get('/', (req, res) => {
    res.status = 200

    const html = renderToString(
        <Provider store={store}>
            <App />
        </Provider>
    )

    res.send(createPage(html, store.getState()))
})

module.exports = router
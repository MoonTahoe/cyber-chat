import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { App } from '../../components'
import { Router } from 'express'
import initialState from '../../data/client'
import storeFactory from '../../store'
import { match, RouterContext } from 'react-router'
import routes from '../../routes'

const clientStore = storeFactory(true, false, initialState)

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
  <script src="/assets/bundle.min.js"></script>
</body>
</html>`

router.get('*', (req, res) => {
    match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
        if (error) {
            res.status(500).send(error.message)
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            let html = renderToString(
                <Provider store={clientStore}>
                    <RouterContext {...renderProps} />
                </Provider>
            )
            res.status(200).send(createPage(html, clientStore.getState()))
        } else {
            res.status(404).send('Not found')
        }
    })
})

module.exports = router
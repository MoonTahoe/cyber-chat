import React from 'react'
import { render } from 'react-dom'
import { App } from './components'

window.React = React

render(
    <App />,
    document.getElementById('react-container')
)
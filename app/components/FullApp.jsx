import React, { PropTypes } from 'react'
import cx from 'classnames'
import { bg } from './CSS/main.css'

const FullApp = ({ children }) => (
  <div>
    <div className={ cx(bg) }>
      <div>
        <h1> Webpack 2 based React Redux Starter <br />
          <small>
          This is a barebone starter with Webpack 2 Chunking working and optimized for speed
        </small> </h1>
        <hr />
      </div>

      { children }
    </div>
  </div>

  )

FullApp.propTypes = {
  children: PropTypes.node.isRequired,
}

export default FullApp

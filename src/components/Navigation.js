import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class Navigation extends Component {
  render() {
    return (
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">{this.props.userObj.displayName}'s Profile</Link>
        </li>
      </ul>
    )
  }
}

Navigation.propTypes = {
  userObj: PropTypes.object.isRequired
}

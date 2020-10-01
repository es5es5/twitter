import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Tweet extends Component {
  static propTypes = {
    tweetObj: Object,
    isOwner: Boolean
  }

  render() {
    return (
      <div>
        {this.props.tweetObj.text}
        {this.props.isOwner &&
        <>
          <button type="button">DELETE</button>
          <button type="button">EDIT</button>
        </>
        }
      </div>
    )
  }
}

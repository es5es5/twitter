import { authService } from 'fbase'
import React, { Component } from 'react'
export default class Profile extends Component {
  onLogOutClick = () => {
    authService.signOut()
  }

  render() {
    return (
      <>
        <button onClick={this.onLogOutClick}>Log Out</button>
      </>
    )
  }
}

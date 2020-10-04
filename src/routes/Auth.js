import { authService, firebaseInstance } from 'fbase'
import React, { Component } from 'react'
import AuthForm from './AuthForm'

export default class Auth extends Component {
  onSocialClick = async (event) => {
    const { name } = event.target
    let provider = null
    switch (name) {
      case 'google':
        provider = new firebaseInstance.auth.GoogleAuthProvider()
        break
      case 'github':
        provider = new firebaseInstance.auth.GithubAuthProvider()
        break
      default:
        break
    }
    const data = await authService.signInWithPopup(provider)
    console.log(data)
  }
  render() {
    return (
      <div>
        <AuthForm />
        <div>
          <button type="button" name="google" onClick={this.onSocialClick}>GOOGLE</button>
        </div>
      </div>
    )
  }
}

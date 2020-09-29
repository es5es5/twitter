import { authService, firebaseInstance } from 'fbase'
import { auth } from 'firebase'
import React, { Component } from 'react'

export default class Auth extends Component {
  state = {
    email: '',
    password: '',
    newAccount: true,
    error: ''
  }
  onChange = (event) => {
    const { name, value } = event.target

    switch (name) {
      case 'email':
        this.setState({
          email: value
        })
        break
      case 'password':
        this.setState({
          password: value
        })
        break
      default:
        break
    }
  }
  onSubmit = async (event) => {
    event.preventDefault()
    let data = null
    try {
      if (this.state.newAccount) {
        data =
        await authService.createUserWithEmailAndPassword(
          this.state.email,
          this.state.password
        )
      } else {
        data =
        await authService.signInWithEmailAndPassword(
          this.state.email,
          this.state.password
        )
      }
      console.log(data)
    } catch (error) {
      this.setState({ error: error.message  })
    }
  }
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
        <form onSubmit={this.onSubmit}>
          <input type="email" name="email" placeholder="E-mail" value={this.state.email} required onChange={this.onChange} />
          <input type="password" name="password" placeholder="Password" value={this.state.password} required onChange={this.onChange} />
          <button type="submit">{ this.state.newAccount ? 'Create Account' : 'Log In' }</button>
        </form>
        <p>{ this.state.error }</p>
        <div>
          <button type="button" name="google" onClick={this.onSocialClick}>GOOGLE</button>
        </div>
      </div>
    )
  }
}

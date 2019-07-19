import React, { Component } from 'react'
import { Button, Form, Container, Header, Message } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'

class Login extends Component {
  state = {
    username: "",
    password: "",
    redirect: false,
    failed: false
  }

  handleUsername = (e, { name, value }) => {
    this.setState({ [name]: value })
    debugger
  }

  handlePassword = (e, { name, value }) => {
    this.setState({ [name]: value })
    debugger
  }

  handleSubmit = (e) => {
    fetch('http://localhost:3000/users/login', {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        "Accept": "application/json"
      },
    	body:JSON.stringify({
        username: this.state.username,
        password: this.state.password
    	})
    }).then(res => res.json())
    .then(data => {
      if (!data.error) {
        this.props.update(data)
        this.setState({redirect: true})
      } else {
        this.setState({failed: true})
      }
    })
  }

  render() {

    if (this.state.redirect) {
      return <Redirect to="/periodic_table"/>
    }

    return(
      <Container className="ui attached segment" id="form-area">
        <Header as='h3'>Log in</Header>
        <Form error={this.state.failed} onSubmit={this.handleSubmit}>
          <Form.Input
            name="username"
            placeholder="Username"
            onChange={this.handleUsername}
            value={this.state.username}
          />
          <Form.Input
            name="password"
            placeholder="Password"
            onChange={this.handlePassword}
            value={this.state.password}
          />
          <Message
            error
            header="Username incorrect"
            content="No user exists with that username"
          />
          <Button type="submit">Log in</Button>
        </Form>
        <br></br>
        <br></br>
        <Link to="/create_account" className="fluid ui button">
        New user? Create an account
        </Link>
      </Container>
    )
  }
}

export default Login

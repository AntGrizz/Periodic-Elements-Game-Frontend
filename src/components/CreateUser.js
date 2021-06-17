import React, { Component } from 'react'
import { Button, Form, Container, Header } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

class CreateUser extends Component {
  state = {
    username: "",
    first_name: "",
    last_name: "",
    password:"",
    redirect: false
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    fetch('http://localhost:3000/users', {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        "Accept": "application/json"
      },
    	body:JSON.stringify({
    		username: this.state.username,
    		first_name: this.state.first_name,
        last_name: this.state.last_name,
        password: this.state.password,
        scores: []
    	})
    }).then(res => res.json())
    .then(data => {
      this.props.update(data.user)
      this.setState({redirect: true})
    })
  }

  render() {

    if (this.state.redirect) {
      return <Redirect to="/periodic_table"/>
    }

    return(
      <Container id="form-area">
        <Header as='h3'>Create an account</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            name="username"
            placeholder="Username"
            onChange={this.handleChange}
            value={this.state.username}
          />
          <Form.Input
            name="first_name"
            placeholder="First name"
            onChange={this.handleChange}
            value={this.state.first_name}
          />
          <Form.Input
            name="last_name"
            placeholder="Last Name"
            onChange={this.handleChange}
            value={this.state.last_name}
          />
          <Form.Input
            name="password"
            type="password"
            placeholder="Password"
            onChange={this.handleChange}
            value={this.state.password}
          />
          <Button type="submit">Create account</Button>
        </Form>
      </Container>
    )
  }
}

export default CreateUser

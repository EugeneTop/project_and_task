import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postUser } from './action/Post_user';

class registration extends Component {

  constructor(props) {
    super(props);
    this.state = {
      massage_login: null,
      massage_password: null,
      massage_email: null,
      massage_server: null
    };
  }

  _registration(){
    let login = this.refs.login.value;
    let password = this.refs.password.value;
    let email = this.refs.email.value;
    let status = this.refs.status.value;
    let val_email = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    let bool = true;

    if(login.length < 5){
      this.setState({massage_login: "Login length less 5 symbols"});
      bool = false;
    }else{
      this.setState({massage_login: null});
    }

    if(password.length < 5){
      this.setState({massage_password: "Password length less 5 symbols"});
      bool = false;
    }else{
      this.setState({massage_password: null});
    }

    if(val_email === null){
        this.setState({massage_email: "Error email"});
        bool = false;
    }else{
      this.setState({massage_email: null});
    }

    if(bool === true){
      this.props.onPostUser(status, login, password, email);
      setTimeout(() => {
        if(this.props.postUser === "This login exist"){
          this.setState({massage_server: "This login exist"});
        }else if(this.props.postUser === "This mail exist"){
          this.setState({massage_server: "This mail exist"});
        }
       } , 1200);
       setTimeout(() => {
        if(this.props.postUser === "OK"){
          alert("Activation send your mail");
          document.location.href="/";
        }
       } , 2500);
    }
  }

  render() {
    return (
      <div className="body_div">
        <nav class="navbar navbar-toggleable-md navbar-light bg-faded">
          <a class="navbar-brand" href="/"><p className="head_text">Project-task</p></a>
          <div className="text-right head_text" style={{marginTop: '12px', marginRight: '30px'}}>
            <a href="/registration">Sign up</a>
            <span> or </span>
            <a href="/login">Sign in</a>
            </div>
        </nav>
        <div className="container">
            <div className="form-group col-md-12 form_registration">
              <div className="row">
                <div className="col-md-6 text_body_reg">
                  <h1>Create acount developer or manager</h1>
                </div>
                <div className="col-md-6" style={{color: 'white'}}>
                  <h1 className="text-center head_text">Registration</h1>
                  <input type="text" className="form-control col-md-12 input_style" ref="login" placeholder="Login"/>
                  {this.state.massage_login}
                  <input type="text" className="form-control col-md-12 input_style" ref="email" placeholder="email"/>
                  {this.state.massage_email}
                  <input type="password" className="form-control col-md-12 input_style" ref="password" placeholder="password"/>
                  {this.state.massage_password}
                  <select className="form-control col-md-12 input_style selectpicker" ref="status">
                    <option value="dev">Developer</option>
                    <option value="manager">Manager</option>
                  </select>
                  {this.state.massage_server}
                  <button className="form-control btn btn-primary col-md-12 input_style selectpicker" onClick={this._registration.bind(this)}>Registration</button>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    postUser: state.postUser
  }),
  dispatch => ({
    onPostUser: (status, login, email, password) => {
      dispatch(postUser(status, login, email, password));
    },
  })
)(registration);

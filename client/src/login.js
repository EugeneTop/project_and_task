import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postLogin } from './action/login';

class login extends Component {

    constructor(props) {
        super(props);
        this.state = {
          massage_err: null,
        };
    }

    _login(){
      let login = this.refs.login.value;
      let password = this.refs.password.value;
      let status = this.refs.status.value;

      this.props.onPostLogin(status, login, password);

      setTimeout(() => {
        if(this.props.postLogin !== "Error password or login"){
          sessionStorage.setItem("User", [JSON.stringify(this.props.postLogin)]);
          document.location.href='/projects';
        }else{
          this.setState({massage_err: "Error password or login"});
        } 
      }, 2000);
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
                  <h1>login your acount developer or manager</h1>
                </div>
                <div className="col-md-6" style={{color:"white"}}>
                  <h1 className="text-center head_text">Login</h1>
                  <input type="text" className="form-control col-md-12 input_style" ref="login" placeholder="Login"/>
                  <input type="password" className="form-control col-md-12 input_style" ref="password" placeholder="password"/>
                  <select className="form-control col-md-12 input_style selectpicker" ref="status">
                    <option value="dev">Developer</option>
                    <option value="Manager">Manager</option>
                  </select>
                  {this.state.massage_err}
                  <button className="form-control btn btn-primary col-md-12 input_style selectpicker" onClick={this._login.bind(this)}>Login</button>
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
    postLogin: state.postLogin
  }),
  dispatch => ({
    onPostLogin: (status, login, password) => {
      dispatch(postLogin(status, login, password));
    },
  })
)(login);

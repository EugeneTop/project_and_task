import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      User: null,
    };
  }

  componentWillMount(){
    let data = sessionStorage.getItem('User');
    let User = JSON.parse( data )
    this.setState({User: User});
  }

  body(){
    console.log(this.props.user);
    if(!this.state.User.id){
      return (
        <div className="body_div">
          <nav class="navbar navbar-toggleable-md navbar-light bg-faded">
            <a class="navbar-brand" href="/"><p className="head_text">Project-task</p></a>
          </nav>
          <div className="container">
              <div className="form-group col-md-12 form_registration">
                <div className="row">
                  <div className="col-md-6 text_body_reg">
                    <h1 className="text-center">Create acount or login your profile</h1>
                  </div>
                  <div className="col-md-6">
                    <a href="/registration" className="form-control btn btn-primary offset-md-6 col-md-6 input_style btn-contr1">Create account</a>
                    <a href="/login" className="form-control btn btn-primary offset-md-6 col-md-6 input_style btn-contr2">Login</a>
                  </div>
                </div>
              </div>
            </div>
        </div>
      );
    }else{
      document.location.href = "/projects";
    }
  }

  render() {
    return(
      <div className="Ex">
        {this.body()}
      </div>
    );
  }
}

export default connect(
  state => ({

  }),
  dispatch => ({

  })
)(App);

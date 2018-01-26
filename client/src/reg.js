import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postUser } from './action/Post_user';
import { Link } from 'react-router-dom';

class reg extends Component {

  _reg(){
    <Link to="/"/>
  }

  render() {
    return(
        <div>  
            <button onClick={this._reg.bind(this)}>click</button>
            <Link to="/" id={1}>Hi</Link>
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
)(reg);

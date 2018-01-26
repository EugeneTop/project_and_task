import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postProject } from './action/createProj';
import { getProjects, getProjectDev } from './action/getPosts';
import { getDevProj } from './action/getDevProj';

class dev_proj extends Component {

  render() {
    return(
      <div className="Ex">
        <nav class="navbar navbar-toggleable-md navbar-light bg-faded">
          <a class="navbar-brand" href="/"><p className="head_text">Project-task</p></a>
          <div className="text-right head_text" style={{marginTop: '12px', marginRight: '30px'}}>
            <a href="/registration">Sign out</a>
            </div>
        </nav>
          
      </div>
    );
  }
}

export default connect(
  state => ({
    
  }),
  dispatch => ({
    
  })
)(dev_proj);

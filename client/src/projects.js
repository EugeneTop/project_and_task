import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postProject } from './action/createProj';
import { getProjects, getProjectDev } from './action/getPosts';
import { getDevProj } from './action/getDevProj';

class projects extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      User: null,
      btn: null,
    };
  }

  componentWillMount(){
    let data = sessionStorage.getItem('User');
    let User = JSON.parse( data )
    this.setState({User: User});
  }

  componentDidMount(){
    if(this.state.User.type === "manager"){
      this.props.onGetPosts(this.state.User.id);
    }else if(this.state.User.type === "developer"){
      this.props.onGetDevProj(this.state.User.id);
      setTimeout(() => {
        this.props.dev_proj.map((proj) => {
          return this.props.onGetDevPost(this.state.User.id)
        })
      } , 500);
    }
  }

  _create_post(){
    let name = this.refs.name.value;
    let description = this.refs.description.value;
    let id_manager = 1;

    this.props.onPostProject(name, description, id_manager);
    setTimeout(() => {
      document.location.href = "/projects";
     } , 500);
  }

  render() {
    let btn = null;
    let proj = null;
    if(this.state.User.type === "manager"){
      btn = (<div className="container_pr container-fluid">
      <button className="col-md-12" data-toggle="modal" data-target="#myModal">New project</button>
    </div>);
      proj = (this.props.posts.map((post, id) => {
        return(<tr key={id}>
          <th onClick={() => {
            localStorage.setItem("proj_id", post.id);
            localStorage.setItem("proj_name", post.name);
            document.location.href = '/tasks';
          }} ref={post.id} >{post.name}</th>
          <th>{post.description}</th>
        </tr>)
      }));
    }else if(this.state.User.type === "developer"){
      proj = (this.props.posts.map((posts) => {
        return(posts.map((post, id) => {
          return(
            <tr key={id}>
              <th onClick={() => {
                localStorage.setItem("proj_id", post.id);
                localStorage.setItem("proj_name", post.name);
                document.location.href = '/tasks';
              }} ref={post.id} >{post.name}</th>
              <th>{post.description}</th>
            </tr>
          )
        }))
      }));
    }
    return(
      <div className="Ex">
        <nav class="navbar navbar-toggleable-md navbar-light bg-faded">
          <a class="navbar-brand" href="/"><p className="head_text">Project-task</p></a>
          <div className="text-right head_text" style={{marginTop: '12px', marginRight: '30px'}}>
            </div>
        </nav>
         {btn}
        <div>
          <h1 className="text-center" style={{color:'white'}}>Your Projects</h1>
          <table className="table" style={{backgroundColor:'white', marginTop: '30px'}}>
            <thead>
              <tr>
                <th style={{width:"30%"}} className="text-center">Name</th>
                <th className="text-center">Description</th>
              </tr>
            </thead>
            <tbody>
              {proj}
            </tbody>
          </table>
        </div>
        <div id="myModal" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Create new project</h4>
              </div>
              <div class="modal-footer">
                <input type="text" className="form-control col-md-12 input_style" ref="name" placeholder="Name"/>
                <textarea className="form-control col-md-12 input_style" ref="description" placeholder="description" style={{width: '100%', height:'100px', resize: 'none'}}/>
                <div className="text-center">
                  <button type="button" class="btn btn-success" onClick={this._create_post.bind(this)} style={{'margin-top': '20px'}}>Create</button>
                  <button type="button" class="btn btn-danger" data-dismiss="modal" style={{'margin-top': '20px'}}>Close</button>
                </div>
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
    res: state.postProject,
    posts: state.getPosts,
    dev_proj: state.getDevProj,
  }),
  dispatch => ({
    onPostProject: (name, description, id_manager) => {
      dispatch(postProject(name, description, id_manager));
    },
    onGetPosts:(id) => {
      dispatch(getProjects(id));
    },
    onGetDevProj:(id) => {
      dispatch(getDevProj(id));
    },
    onGetDevPost:(id) => {
      dispatch(getProjectDev(id))
    }
  })
)(projects);

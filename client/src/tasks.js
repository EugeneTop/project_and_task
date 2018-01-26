import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTasks, getMyTasks } from './action/getTask';
import { postT } from './action/createT';
import { getDevName } from './action/getDev';
import { addPro } from './action/addPro';

class tasks extends Component {

  constructor(props) {
    super(props);
    this.state = {
      User: null,
    };
  }

  componentWillMount(){
    let id = localStorage.getItem("proj_id");
    this.props.onGetTasks(id);
    let data = sessionStorage.getItem('User');
    let User = JSON.parse( data )
    this.setState({User: User});
  }

  _create_task(){
  }

  myTasck(){
    let id = localStorage.getItem("proj_id");
    let id_dev = this.state.User.id;
    this.props.onGetMyTasks(id, id_dev);
  }

  _create(){
    let id_project = localStorage.getItem("proj_id");
    let description = this.refs.description_dev.value;
    let name = this.refs.name_dev.value;
    let developer_id = this.state.User.id;
    this.props.onPostT(id_project, description, name, developer_id);
    document.location.href="/tasks";
  }

  _createT(){
    this.props.onGetDev(this.refs.dev.value);
    this.props.getDev.map((dev) => {
      let id_project = localStorage.getItem("proj_id");
      let description = this.refs.description_dev.value;
      let name = this.refs.name_dev.value;
      this.props.onGetDev(dev);
      let developer_id = dev.id;
      this.props.onPostT(id_project, description, name, developer_id);
      document.location.href="/tasks";
    })
  }

  add(){
    this.props.onGetDev(this.refs.nameDev.value);
    this.props.getDev.map((dev) => {
      let id_proj = localStorage.getItem("proj_id");
      this.props.onAddPro(dev.login, dev.id, id_proj);
      document.location.href="/tasks";
    })
  }

  render() {
    let db;

    if(this.state.User.type === 'developer'){
      db = (<div><button className="col-md-12" data-toggle="modal" data-target="#myModal">New task</button><button className="col-md-12" style={{marginTop: '10px'}} onClick={this.myTasck.bind(this)}>My tasks in this project</button></div>);
    }else if(this.state.User.type === 'manager'){
      db = (<button className="col-md-12" style={{marginTop: '10px'}}  data-toggle="modal" data-target="#md">Add developer in project</button>)
    }
    return(
      <div className="Ex">
        <nav class="navbar navbar-toggleable-md navbar-light bg-faded">
          <a class="navbar-brand" href="/"><p className="head_text">Project-task</p></a>
          <div className="text-right head_text" style={{marginTop: '12px', marginRight: '30px'}}>
            </div>
        </nav>
        <div className="container_pr container-fluid">
          {db}
        </div>
        <div>
          <h1 className="text-center" style={{color:'white'}}>Your tasks in project {localStorage.getItem('proj_name')}</h1>
          <table className="table" style={{backgroundColor:'white', marginTop: '30px'}}>
            <thead>
              <tr>
                <th style={{width:"30%"}} className="text-center">Name</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody>
              {this.props.tasks.map((task, id) => {
                return(<tr>
                  <th key={id} onClick={() => {
                    localStorage.setItem("task_id", task.id);
                    localStorage.setItem("task_name", task.name);
                    document.location.href = '/task';}}>{task.name}</th>
                  <th key={id}>{task.status}</th>
                </tr>)
              })}
            </tbody>
          </table>
        </div>
        <div id="myModal" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Create new tasks</h4>
              </div>
              <div class="modal-footer">
                <input type="text" className="form-control col-md-12 input_style" ref="name_dev" placeholder="Name"/>
                <textarea className="form-control col-md-12 input_style" ref="description_dev" placeholder="description" style={{width: '100%', height:'100px', resize: 'none'}}/>
                <div className="text-center">
                  <button type="button" class="btn btn-success" onClick={this._create.bind(this)} style={{'margin-top': '20px'}}>Create</button>
                  <button type="button" class="btn btn-danger" data-dismiss="modal" style={{'margin-top': '20px'}}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="myModal" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Create new tasks</h4>
              </div>
              <div class="modal-footer">
                <input type="text" className="form-control col-md-12 input_style" ref="name" placeholder="Name"/>
                <input type="text" className="form-control col-md-12 input_style" ref="dev" placeholder="dev"/>
                <textarea className="form-control col-md-12 input_style" ref="description" placeholder="description" style={{width: '100%', height:'100px', resize: 'none'}}/>
                <div className="text-center">
                  <button type="button" class="btn btn-success" onClick={this._create.bind(this)} style={{'margin-top': '20px'}}>Create</button>
                  <button type="button" class="btn btn-danger" data-dismiss="modal" style={{'margin-top': '20px'}}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="md" class="modal fade" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">add Developer</h4>
              </div>
              <div class="modal-footer">
                <input type="text" className="form-control col-md-12 input_style" ref="nameDev" placeholder="Name Developer"/>
                <div className="text-center">
                  <button type="button" class="btn btn-success" onClick={this.add.bind(this)} style={{'margin-top': '20px'}}>Add</button>
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
    tasks: state.getTasks,
    dev_on_proj: state.getDevInProj,
    getDev: state.getDev
  }),
  dispatch => ({
    onGetTasks:(id) => {
      dispatch(getTasks(id));
    },
    onGetMyTasks:(id, id_dev) => {
      dispatch(getMyTasks(id, id_dev));
    },
    onPostT:(id_project, description, name, developer_id) => {
      dispatch(postT(id_project, description, name, developer_id));
    },
    onGetDev:(name) => {
      dispatch(getDevName(name));
    },
    onAddPro:(name, id_dev, id_proj) => {
      dispatch(addPro(name, id_dev, id_proj));
    }
  })
)(tasks);

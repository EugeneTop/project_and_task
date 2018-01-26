import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTask } from './action/getInfTask';
import { addCom } from './action/addComment';
import { Com } from './action/comment';
import { setStatus } from './action/status';

class task extends Component {

  constructor(props) {
    super(props);
    this.state = {
      task: {
        name: null,
        description: null,
        dev_id: null,
        status: null
      },
      User: null
    };
  }

  componentWillMount(){
    let data = sessionStorage.getItem('User');
    let User = JSON.parse( data )
    this.setState({User: User});
    let id = localStorage.getItem("task_id");
    this.props.onGeTask(id);
    this.props.onCom(id);
    setTimeout(() => {
      this.props.task.map((task) => {
        this.setState({task: {
          name: task.name,
          description: task.description,
          dev_id: task.developer_id,
          status: task.status
        }});
        return task;
      })
     } , 100);
  }

  _comment(){
    if(this.state.User.type === "developer"){
      let id_dev = this.state.User.id;
      let comment = this.refs.comment.value;
      let id_task = localStorage.getItem("task_id");
      let name = this.state.User.login;
      this.props.onAddCom(id_dev, null, comment, id_task, name)
      document.location.href = '/task';
    }
    if(this.state.User.type === "manager"){
      let id_man = this.state.User.id;
      let comment = this.refs.comment.value;
      let id_task = localStorage.getItem("task_id");
      let name = this.state.User.login;
      this.props.onAddCom(null, id_man, comment, id_task, name)
      document.location.href = '/task';
    }
  }

  status(status){
    let id = localStorage.getItem("task_id");
    this.props.onSetStatus(id, status);
  }

  render() {
    let status = null;
    setTimeout(() => {
      if(this.state.task.status === "waiting"){
        status = (
          <select className="form-control col-md-12 input_style selectpicker" ref="status">
            <option value="waiting">waiting</option>
            <option value="implementetion">implementetion</option>
            <option value="verifying">verifying</option>
            <option value="releasing">releasing</option>
          </select>
        );
      }
     } , 100);
    return(
      <div className="Ex">
        <nav class="navbar navbar-toggleable-md navbar-light bg-faded">
          <a class="navbar-brand" href="/"><p className="head_text">Project-task</p></a>
          <div className="text-right head_text" style={{marginTop: '12px', marginRight: '30px'}}>
            </div>
        </nav>
        <div className="row" style={{ margin: '0px'}}>
          <div className="body-task col-md-9" style={{margin: '0px', color: 'white'}}>
            {this.props.task.map((task, id) => {
              return(
                <div>
                  <h1 className="text-center">{task.name}</h1>
                  <h3 className="text-right"><select className="form-control input_style selectpicker" ref="status">
                  <option disabled>{task.status}</option>
                  <option value="waiting" onClick={this.status.bind("waiting")}>waiting</option>
                  <option value="implementetion" onClick={this.status.bind("verifying")}>implementetion</option>
                  <option value="verifying" onClick={this.status.bind("verifying")}>verifying</option>
                  <option value="releasing" onClick={this.status.bind("releasing")}>releasing</option>
                </select></h3>
                  <h3>description: {task.description}</h3>
                </div>
              );
            })}
          </div>
          <div className="comment col-md-3 container-fluid text-center" style={{backgroundColor:'white', height:'100%', margin: '0px'}}>
            <h3>Comment</h3>
            {this.props.com.map((com, id) => {
              return <div className="text-left"><b>{com.name}: </b>{com.comment} <b>delete</b> <b>update</b></div>
            })}
            <textarea className="col-md-12" style={{height: '100px', resize: 'none', marginTop:'10px'}} ref='comment'></textarea>
            <button class="btn btn-success" onClick={this._comment.bind(this)} style={{marginTop:'10px'}}>Comment</button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    task: state.getTask,
    com: state.com
  }),
  dispatch => ({
    onGeTask:(id, id_dev) => {
      dispatch(getTask(id));
    }, 
    onAddCom:(id_dev, id_man, comment, id_task, name) => {
      dispatch(addCom(id_dev, id_man, comment, id_task, name))
    },
    onCom:(id_task) => {
      dispatch(Com(id_task))
    },
    onSetStatus:(id, status) => {
      dispatch(setStatus(id, status));
    }
  })
)(task);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders } from '../actions';
import moment from 'moment';
//import validator from 'validator';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      dueDate: '',
      taskTime:'',
      ranking: ''  
    }
  }

  addReminder(){
    this.props.addReminder(this.state.text, this.state.dueDate, this.state.taskTime, this.state.ranking);
  }

  deleteReminder(id) {
    this.props.deleteReminder(id);
  }

  renderReminders() { 
    const { reminders } = this.props; 
    return (
      <ul className="list-group col-sm-4">
      {
        reminders.map(reminder => {
          return(
            <li key={reminder.id} className="list-group-item">
              <div className="list-item">
                <div>TASK: {reminder.text}</div> {/* LIST ITEMS */}
                <div>DATE: <em>{moment (new Date (reminder.dueDate)).fromNow()}</em></div>
                <div> TIME: {reminder.taskTime}</div> 
                <div> IMPORTANCE LEVEL: {reminder.ranking}</div> 
              </div> 
              <div 
                className="list-item delete-button"
                onClick={() => this.deleteReminder(reminder.id)}
              >
             &#x2715; 
            </div>
            </li>
          )
        })
      }
      </ul>
    )
  }

  render() {
    return (
      <div className="App">
        <div className="title text-danger">
          Reminder Pro 
        </div>
    
      
    
        <div className="form-inline reminder-form">
          <div className="form-group">
            <input className="form-control" placeholder="I have to.." 
            onChange={event => this.setState({text: event.target.value})}
             />
             <input 
               className="form-control"
               type="date"
               onChange={event => this.setState({ dueDate: event.target.value})} 
               />
               <input 
               className="form-control"
               type="time"
               onChange={event => this.setState({ taskTime: event.target.value})}
               />
               <input className="form-control" 
               type="number" name="quantity" min="1" max="10" placeholder="1-10" 
               onChange={event => this.setState({ranking: event.target.value})}
               />
          </div>
        </div>
        <button type="button" className="btn btn-success"
          onClick={() => this.addReminder(
            
          )}
          >
            Add Reminder 
          </button>
        <h1 className="title"> TASKS TO BE COMPLETED </h1>
        { this.renderReminders () } {/* PLACEMENT OF LIST ITEMS */}
        <div 
          className="btn btn-danger"
          onClick={() => this.props.clearReminders()}
        >
         Clear Reminders 
        </div>
        
      </div>

      
    );
  }
}








function mapStateToProps(state) {
  return {
    reminders: state
  }
}

export default connect(mapStateToProps, {addReminder, deleteReminder, clearReminders}) (App);
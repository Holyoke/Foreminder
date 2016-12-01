import React from 'react'
import uniqueId from '../../util/id_generator'
import moment from 'moment'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

class ReminderForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      body: '',
      done: false,
      remind_date: moment().add(24, 'hours')
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  update (property) {
    return e => this.setState({[property]: e.target.value })
  }

  handleSubmit (e) {
    e.preventDefault()
    const reminder = Object.assign({}, this.state, {id: uniqueId()})

    //parse date
    reminder.remind_date = reminder.remind_date.format("LLL")
    this.props.receiveReminder(reminder)

    // reset form
    this.setState({
      title: '',
      body: '',
      remind_date: moment().add(24, 'hours')
    })
  }

  handleChange (date) {
    this.setState({
      remind_date: date
    })
  }

  render () {
    return (
      <form className="reminder-form" onSubmit={this.handleSubmit}>
        <label>Title:
          <input
            className="input"
            ref="title"
            value={this.state.title}
            placeholder="Please enter a reminder..."
            onChange={this.update('title')}
            required />
        </label>

        <label>Body:
          <input
            className="input"
            ref="title"
            value={this.state.body}
            placeholder="..."
            onChange={this.update('body')}
            required />
        </label>

        <link rel='stylesheets' href='dist/react-datepicker.css' />
        <DatePicker
        selected={this.state.remind_date}
        onChange={this.handleChange} />

        <button className="create-button">Create reminder!</button>
      </form>
    )
  }
}

export default ReminderForm
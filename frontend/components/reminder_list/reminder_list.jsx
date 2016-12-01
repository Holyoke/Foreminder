import React from 'react'

// components
import ReminderListItem from './reminder_list_item'
import ReminderForm from './reminder_form'

//actions

class ReminderList extends React.Component {

  render () {
    const { reminders } = this.props
    const reminderItems = reminders.map(reminder => {
      return (
        <ReminderListItem
          key={`reminder-list-item${reminder.id}`}
          reminder={reminder}
          removeReminder={this.props.removeReminder}
          receiveReminder={this.props.receiveReminder} />
      )
    })

    return (
      <div className='reminder-list'>
        <p>Reminder List Presentational</p>
        { reminderItems }
        <ReminderForm receiveReminder={ this.props.receiveReminder }/>
      </div>
    )
  }
}

export default ReminderList
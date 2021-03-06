import { connect } from 'react-redux'
import SessionForm from './session_form'

//  actions
import { login, signup, logoutCurrentUser } from '../actions/session_actions'
import { clearErrors } from '../actions/error_actions'

// selectors
import { parseErrors } from '../reducers/selector.js'

const mapStatetoProps = (state) => ({
  loggedIn: Boolean(state.session.currentUser),
  errors: parseErrors(state.session)
})

const mapDispatchToProps = (dispatch, {location}) => {
  const formType = location.pathname.slice(1)
  const processForm = (formType === 'login') ? login : signup

  return {
    processForm: user => dispatch(processForm(user)),
    formType,
    clearErrors: () => dispatch(logoutCurrentUser())
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(SessionForm)

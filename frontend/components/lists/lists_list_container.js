import { connect } from 'react-redux'
import ListsList from './lists_list'

// actions
import { fetchLists, createList, updateList, deleteList } from '../../actions/list_actions'
import { receiveCurrentList } from '../../actions/current_list_actions'

// selectors
import { getLists, parseErrors } from '../../reducers/selector'

const mapStateToProps = state => ({
  lists: getLists(state),
  errors: parseErrors(state)
})

const mapDispatchToProps = (dispatch) => ({
  createList: (list) => dispatch(createList({list})),
  fetchLists: () => dispatch(fetchLists()),
  receiveCurrentList: (list) => dispatch(receiveCurrentList(list)),
  updateList: (list) => dispatch(updateList({list})),
  deleteList: (list) => dispatch(deleteList({list}))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListsList)

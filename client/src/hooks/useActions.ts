import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { EmployeesActionCreators } from '../redux/reducers/employees/action-creators';
import { PostsActionCreators } from '../redux/reducers/posts/action-creators';

const allActionsCreators = {
  ...EmployeesActionCreators,
  ...PostsActionCreators,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(allActionsCreators, dispatch);
};

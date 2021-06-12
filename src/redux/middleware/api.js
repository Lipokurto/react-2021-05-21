import { REQUEST, SUCCESS, FAILURE } from '../constants';

export default (store) => (next) => async (action) => {
  if (!action.apiCall) return next(action);

  const { apiCall, type, ...rest } = action;

  next({ ...rest, type: type + REQUEST });

  try {
    const data = await apiCall();
    console.log(data);
    next({ ...rest, type: type + SUCCESS, data });
  } catch (error) {
    next({ ...rest, type: type + FAILURE, error });
  }
};

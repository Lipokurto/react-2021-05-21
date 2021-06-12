import { arrToMap } from '../utils';
import { FAILURE, LOAD_PRODUCTS, REQUEST, STATUS, SUCCESS } from '../constants';
import produce from 'immer';

const initialState = {
  status: STATUS.idle,
  entities: {},
  error: null,
};

export default produce((draft = initialState, action) => {
  const { type, data, error, restaurantId } = action;

  switch (type) {
    case LOAD_PRODUCTS + REQUEST:
      console.log(data);
      draft = {
        status: STATUS.pending,
        entities: {},
        error: null,
      };
      break;

    case LOAD_PRODUCTS + SUCCESS:
      draft = {
        status: STATUS.fulfilled,
        entities: arrToMap(data[restaurantId].menu),
      };
      break;
    case LOAD_PRODUCTS + FAILURE:
      draft = {
        status: STATUS.rejected,
        entities: {},
        error: error,
      };
      break;
    default:
      return draft;
  }
});

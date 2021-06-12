import produce from 'immer';
import {
  ADD_REVIEW,
  FAILURE,
  LOAD_RESTAURANTS,
  REQUEST,
  STATUS,
  SUCCESS,
} from '../constants';
import { arrToMap } from '../utils';

const initialState = {
  status: STATUS.idle,
  entities: {},
  error: null,
};

export default produce((draft = initialState, action) => {
  const { type, restaurantId, reviewId, data, error } = action;

  switch (type) {
    case LOAD_RESTAURANTS + REQUEST:
      draft = { status: STATUS.pending, error: null };
      break;
    // return { ...state, status: STATUS.pending, error: null };
    case LOAD_RESTAURANTS + SUCCESS:
      draft = {
        status: STATUS.fulfilled,
        entities: draft.data,
      };
      break;
    // return { ...state, status: STATUS.fulfilled, entities: arrToMap(data) };
    case LOAD_RESTAURANTS + FAILURE:
      draft = { status: STATUS.rejected, error: error };
      break;
    // return { ...state, status: STATUS.rejected, error };
    case ADD_REVIEW:
      draft = draft.entities[restaurantId].reviews.push(reviewId);
      break;
    default:
      return draft;
  }
});

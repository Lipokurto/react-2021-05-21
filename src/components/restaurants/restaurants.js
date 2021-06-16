import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Restaurant from '../restaurant';
import Loader from '../loader';
import {
  loadRestaurants,
  restaurantsListSelector,
  restaurantsLoadedSelector,
} from '../../redux/features/restaurants';

import styles from './restaurants.module.css';

const Restaurants = ({ restaurants, loaded, loadRestaurants }) => {
  useEffect(() => {
    loadRestaurants();
  }, []); // eslint-disable-line

  if (!loaded) return <Loader />;

  return (
    <div>
      <div className={styles.tabs}>
        {restaurants.map(({ id, name }) => (
          <NavLink
            key={id}
            to={`/restaurants/${id}/Menu`}
            className={styles.tab}
            activeClassName={styles.active}
          >
            {name}
          </NavLink>
        ))}
      </div>
      <Switch>
        <Route path="/restaurants/:restId/Menu">
          {({ match }) => <Restaurant id={match.params.restId} />}
        </Route>
        <Route path="/restaurants/:restId/Reviews">
          {({ match }) => <Restaurant id={match.params.restId} />}
        </Route>
        <Redirect to={`/restaurants/${restaurants[0].id}/Menu`} />
      </Switch>
    </div>
  );
};

Restaurants.propTypes = {
  restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

const mapStateToProps = (state) => ({
  restaurants: restaurantsListSelector(state),
  loaded: restaurantsLoadedSelector(state),
});

export default connect(mapStateToProps, { loadRestaurants })(Restaurants);

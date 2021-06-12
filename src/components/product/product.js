import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './product.module.css';

import Button from '../button';
import {
  amountSelector,
  productSelector,
  productsLoadingSelector,
  productsLoadedSelector,
} from '../../redux/selectors';
import { loadProducts } from '../../redux/actions';
import { decrement, increment } from '../../redux/actions';
import Loader from '../loader';

const Product = ({
  product,
  amount,
  increment,
  decrement,
  loading,
  loaded,
  loadProducts,
}) => {
  useEffect(() => {
    if (!loading && !loaded) {
      loadProducts();
    }
  }, [loading, loaded]); // eslint-disable-line

  if (loading || !loaded) return <Loader />;

  return (
    <div className={styles.product} data-id="product">
      <div className={styles.content}>
        <div>
          <h4 className={styles.title}>{product.name}</h4>
          <p className={styles.description}>{product.ingredients.join(', ')}</p>
          <div className={styles.price}>{product.price} $</div>
        </div>
        <div>
          <div className={styles.counter}>
            <div className={styles.count} data-id="product-amount">
              {amount}
            </div>
            <div className={styles.buttons}>
              <Button onClick={decrement} icon="minus" />
              <Button onClick={increment} icon="plus" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    ingredients: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
  fetchData: PropTypes.func,
  // from connect
  amount: PropTypes.number,
  increment: PropTypes.func,
  decrement: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  amount: amountSelector(state, props),
  product: productSelector(state, props),
  loading: productsLoadingSelector(state),
  loaded: productsLoadedSelector(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  loadProducts: () => dispatch(loadProducts(props.id)),
  increment: () => dispatch(increment(props.id)),
  decrement: () => dispatch(decrement(props.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);

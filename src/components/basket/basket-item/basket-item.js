import { useContext } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { increment, decrement, remove } from '../../../redux/features/order';
import { NavLink } from 'react-router-dom';
import Button from '../../button';
import styles from './basket-item.module.css';

import moneyContext from '../../../contexts/money';
import { restaurantsListSelector } from '../../../redux/features/restaurants';

function BasketItem({
  product,
  amount,
  subtotal,
  increment,
  decrement,
  remove,
  restaurants,
}) {
  const { m } = useContext(moneyContext);

  const restarantId = restaurants.find((el) =>
    el.menu.some((elm) => elm === product.id)
  ).id;

  return (
    <div className={styles.basketItem}>
      <div className={styles.name}>
        <NavLink key={restarantId} to={`/restaurants/${restarantId}/Menu`}>
          {product.name}
        </NavLink>
      </div>
      <div className={styles.info}>
        <div className={styles.counter}>
          <Button onClick={decrement} icon="minus" secondary small />
          <span className={styles.count}>{amount}</span>
          <Button onClick={increment} icon="plus" secondary small />
        </div>
        <p className={cn(styles.count, styles.price)}>{m(subtotal)}</p>
        <Button onClick={remove} icon="delete" secondary small />
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  increment: () => dispatch(increment(ownProps.product.id)),
  decrement: () => dispatch(decrement(ownProps.product.id)),
  remove: () => dispatch(remove(ownProps.product.id)),
});
const mapStateToProps = (state) => ({
  restaurants: restaurantsListSelector(state),
});
export default connect(mapStateToProps, mapDispatchToProps)(BasketItem);

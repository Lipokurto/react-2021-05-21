import { useSelector } from 'react-redux';
import { useLayoutEffect, useMemo } from 'react';
import BasketProduct from './basketProduct/basketProduct';

const Basket = (props) => {
  const productCounter = useSelector((state) => state.order.basket);

  const productList =
    // debugger;
    productCounter.map((el, ind) => {
      return (
        <div key={ind}>
          <BasketProduct
            id={el.id}
            name={el.name}
            count={el.count}
            price={el.price}
          />
        </div>
      );
    });

  return (
    <div>
      <div>{productList}</div>
    </div>
  );
};

// debugger;

export default Basket;

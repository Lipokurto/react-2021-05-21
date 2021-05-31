import cn from 'classnames';

import { ReactComponent as Star } from '../../icons/star.svg';
import PropTypes from 'prop-types';
import styles from './rate.module.css';

const Rate = ({ value }) => (
  <div>
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={cn(styles.star, { [styles.checked]: i <= value - 1 })}
      />
    ))}
  </div>
);

Rate.propType = {
  value: PropTypes.string,
};
export default Rate;

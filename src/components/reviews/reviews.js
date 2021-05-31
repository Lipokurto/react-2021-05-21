import Review from './review';
import styles from './reviews.module.css';
import PropTypes from 'prop-types';

const Reviews = ({ reviews }) => {
  return (
    <div className={styles.reviews} data-id="reviews">
      {reviews.map((review) => (
        <Review key={review.id} {...review} />
      ))}
    </div>
  );
};

Reviews.prototype = {
  reviews: PropTypes.shape({
    name: PropTypes.string.isRequired,
    text: PropTypes.string,
    rating: PropTypes.number.isRequired,
  }),
};

export default Reviews;

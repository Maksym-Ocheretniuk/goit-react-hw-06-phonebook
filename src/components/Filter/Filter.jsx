import { useSelector, useDispatch } from 'react-redux';
import { changeFilter } from 'redux/filterSlice';
import { getFilter } from 'redux/selectors';

// import PropTypes from 'prop-types';

import css from './Filter.module.css';

const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const changeFilterHandler = e => {
    const { value } = e.currentTarget;
    dispatch(changeFilter(value));
  };

  return (
    <div className={css.filterWrapper}>
      <label className={css.filterLabel}>
        Find contacts by name
        <input
          className={css.filterInput}
          value={filter}
          onChange={changeFilterHandler}
          type="text"
          name="filter"
        />
      </label>
    </div>
  );
};

// Filter.propTypes = {
//   value: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
// };

export default Filter;

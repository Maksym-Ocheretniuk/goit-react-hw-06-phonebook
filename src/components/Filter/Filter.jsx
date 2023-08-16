import PropTypes from 'prop-types';

import css from './Filter.module.css';

export const Filter = ({ value, onChange }) => (
  <div className={css.filterWrapper}>
    <label className={css.filterLabel}>
      Find contacts by name
      <input
        className={css.filterInput}
        value={value}
        onChange={onChange}
        type="text"
        name="filter"
      />
    </label>
  </div>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

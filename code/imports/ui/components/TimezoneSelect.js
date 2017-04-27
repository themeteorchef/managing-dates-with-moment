import React from 'react';
import PropTypes from 'prop-types';
import timezones from '../../modules/timezones';

const TimezoneSelect = ({ value, onChange }) => (
  <select
    className="form-control"
    value={value}
    onChange={onChange}
    name="timezone"
  >
    {timezones.map(({ name }) =>
    <option key={ name } value={ name }>{ name }</option>)}
  </select>
);

TimezoneSelect.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default TimezoneSelect;

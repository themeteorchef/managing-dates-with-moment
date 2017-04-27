import React, { PropTypes } from 'react';
import moment from 'moment';
import { DateInput } from '@blueprintjs/datetime';

import '@blueprintjs/datetime/dist/blueprint-datetime.css';

class DateField extends React.Component {
  constructor(props) {
    super(props);
    const initialValue = props.value;
    this.state = { value: initialValue };
  }

  render() {
    const { onChange } = this.props;
    return (<div className="DateField">
      <DateInput
        format="MMMM Do, YYYY"
        value={this.state.value}
        onChange={(value) => {
          this.setState({ value });
          onChange(value);
        }}
        minDate={(new Date(moment().subtract(90, 'years').format()))}
      />
    </div>);
  }
}

DateField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default DateField;

import React from 'react';
import { Table } from 'react-bootstrap';
import TimezoneSelect from '../components/TimezoneSelect';
import DateField from '../components/DateField';
import {
  currentTimezone,
  hoursMinutes,
  timeago,
  localize,
  monthDayYear,
  monthDayYearAtTime,
  epochToISOString,
  daysInFuture,
  daysInPast,
  hasPassed,
} from '../../modules/dates';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentTimezone: currentTimezone() };
    this.setInputState = this.setInputState.bind(this);
  }

  examples() {
    return [
      { datepicker: false, defaultValue: 'Auto-Detected', label: 'Your Timezone', conversion(value, timezone) { return timezone; } },
      { datepicker: false, defaultValue: 'Auto-Detected', label: 'Time (Hours, Minutes)', conversion(value, timezone) { return hoursMinutes((new Date()), timezone); } },
      { datepicker: true, label: 'Timeago', conversion(value) { return timeago(value); } },
      { datepicker: true, label: 'Localized ISO8601', conversion(value, timezone) { return localize(value, timezone); } },
      { datepicker: true, label: 'Month, Day, Year', conversion(value, timezone) { return monthDayYear(value, timezone); } },
      { datepicker: true, label: 'Month, Day, Year at Time', conversion(value) { return monthDayYearAtTime(value); } },
      { datepicker: false, defaultValue: ((new Date()).getTime()), label: 'Epoch to ISO String', conversion(value) { return epochToISOString(value); } },
      { datepicker: false, defaultValue: 5, label: 'Days in Future', conversion(value) { return monthDayYear(daysInFuture(value)); } },
      { datepicker: false, defaultValue: 5, label: 'Days in Past', conversion(value) { return monthDayYear(daysInPast(value)); } },
      { datepicker: true, label: 'Date Has Passed', conversion(value) { return hasPassed(value); } },
    ];
  }

  setInputState(value, index) {
    const state = {};
    state[`example_input_${index}`] = value;
    this.setState(state);
  }

  renderDateField(index) {
    return (<DateField
      ref={element => (this[`example_input_${index}`] = element)}
      value={(new Date()).toISOString()}
      onChange={(selectedDate) => {
        this.setInputState(selectedDate, index);
      }}
    />);
  }

  renderTextInput(defaultValue, index) {
    return (<input type="text"
      disabled={defaultValue === 'Auto-Detected'}
      className="form-control"
      value={this.state[`example_input_${index}`]}
      name={`example_input_${index}`}
      onChange={(event) => {
        this.setInputState(event.target.value, index);
      }}
    />);
  }

  componentDidMount() {
    this.examples().forEach(({ defaultValue, datepicker, conversion }, index) => {
      const value = datepicker ? (new Date()).toISOString() : defaultValue;
      this.setInputState(value, index);
    });
  }

  render() {
    return (<div className="Index">
      <Table bordered>
        <tbody>
          <tr>
            <td colSpan="3">
              <TimezoneSelect
                value={this.state.currentTimezone}
                onChange={(event) => {
                  this.setState({ currentTimezone: event.target.value });
                }}
              />
            </td>
          </tr>
          {this.examples()
          .map(({ datepicker, defaultValue, label, conversion }, index) => (
            <tr key={label}>
              <th width="30%" className="text-middle text-center">{label}</th>
              <td width="30%">
                {datepicker ? this.renderDateField(index) :
                this.renderTextInput(defaultValue, index)}
              </td>
              <td className="text-middle text-center">
                {conversion(this.state[`example_input_${index}`], this.state.currentTimezone)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>);
  }
}

Index.propTypes = {};

export default Index;

import _ from 'lodash';
import React, {PropTypes} from 'react';
import {Button, ButtonGroup} from 'react-bootstrap/lib';

const PositionChooser = React.createClass({

  propTypes: {
    onChange: PropTypes.func.isRequired,
    positions: PropTypes.arrayOf(PropTypes.string).isRequired,
    value: PropTypes.string.isRequired
  },

  render() {
    const {positions, value} = this.props;
    return (
      <div>
        <ButtonGroup>
          {_.map(positions, (p) => {
            return (
              <Button
                  key={p}
                  className={value === p ? 'active' : ''}
                  onClick={_.partial(this._onChange, p)}
              >{p}
              </Button>
            );
          })}
        </ButtonGroup>
      </div>
    );
  },

  _onChange(p, ev) {
    ev.preventDefault();
    this.props.onChange(p);
  }

});

export default PositionChooser;

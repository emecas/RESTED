import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { FormGroup, FormControl, Row, Col, ControlLabel } from 'react-bootstrap';

import Fonticon from 'components/Fonticon';
import Collapsable from 'components/Collapsable';
import IconButton from 'components/IconButton';

import * as RequestActions from 'store/request/actions';
import { getBodyType } from 'store/request/selectors';

import { UnstyledButton, FormDataFields } from './StyledComponents';

// Removed redux-form imports and renderField helper

const BodyField = (props) => {
  // Adjust props and logic as needed, since redux-form props like 'input', 'meta', etc. are no longer available

  return (
    <FormGroup>
      <ControlLabel>Body</ControlLabel>
      <FormControl
        type="text"
        placeholder="Enter body"
        // Add value, onChange, etc. as needed for your new form state management
      />
    </FormGroup>
  );
};

BodyField.propTypes = {
  // Update propTypes as needed, removing redux-form-specific props
};

export default connect(
  state => ({
    bodyType: getBodyType(state),
  }),
  { ...RequestActions }
)(BodyField);

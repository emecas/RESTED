import React, { PropTypes } from 'react';
import { FormGroup, FormControl, Row, Col } from 'react-bootstrap';
import Fonticon from 'components/Fonticon';
import Collapsable from 'components/Collapsable';
import HeaderNameAutosuggest from './HeaderNameAutosuggest';
import { UnstyledButton, TrashButton } from './StyledComponents';

function HeadersField({ headers, onChangeHeaders }) {
  function handleNameChange(index, newName) {
    const updated = [...headers];
    updated[index] = { ...updated[index], name: newName };
    onChangeHeaders(updated);
  }

  function handleValueChange(index, newValue) {
    const updated = [...headers];
    updated[index] = { ...updated[index], value: newValue };
    onChangeHeaders(updated);
  }

  function handleRemove(index) {
    const updated = headers.slice();
    updated.splice(index, 1);
    onChangeHeaders(updated);
  }

  function handleAdd() {
    onChangeHeaders([...headers, { name: '', value: '' }]);
  }

  return (
    <div>
      {headers.map((header, key) => (
        <Row key={key}>
          <Col xs={5}>
            <HeaderNameAutosuggest
              value={header.name}
              onChange={e => handleNameChange(key, e.target.value)}
            />
          </Col>
          <Col xs={5}>
            <FormControl
              type="text"
              value={header.value}
              onChange={e => handleValueChange(key, e.target.value)}
              placeholder="Value"
            />
          </Col>
          <Col xs={2}>
            <TrashButton onClick={() => handleRemove(key)} />
          </Col>
        </Row>
      ))}
      <UnstyledButton onClick={handleAdd}>Add header</UnstyledButton>
    </div>
  );
}

HeadersField.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  onChangeHeaders: PropTypes.func.isRequired,
};

export default HeadersField;

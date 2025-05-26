import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form } from 'react-bootstrap';

import * as requestActions from 'store/request/actions';
import * as collectionsActions from 'store/collections/actions';
import { isEditMode } from 'store/config/selectors';
import { DEFAULT_REQUEST } from 'constants/constants';

import Titlebar from './Titlebar';
import URLField from './URLField';
import MethodField, { checkIfCustom } from './MethodField';
import SubmitButton from './SubmitButton';
import HeadersField from './HeadersField';
import BasicAuthField from './BasicAuthField';
import BodyField from './BodyField';

function Request(props) {
  const {
    request = DEFAULT_REQUEST,
    placeholderUrl,
    sendRequest,
    updateRequest,
    editMode,
  } = props;

  const [formValues, setFormValues] = useState(request);

  const isCustom = checkIfCustom(formValues.method);

  function handleChange(field, value) {
    const updated = { ...formValues, [field]: value };
    setFormValues(updated);
    updateRequest(updated);
  }

  function handleHeadersChange(headers) {
    handleChange('headers', headers);
  }

  function handleBasicAuthChange(basicAuth) {
    handleChange('basicAuth', basicAuth);
  }

  function handleBodyTypeChange(bodyType) {
    handleChange('bodyType', bodyType);
  }

  function handleFormDataChange(formData) {
    handleChange('formData', formData);
  }

  function handleDataChange(data) {
    handleChange('data', data);
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendRequest(formValues);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Titlebar />
      <Row>
        <Col xs={12}>
          <URLField
            value={formValues.url}
            onChange={e => handleChange('url', e.target.value)}
            placeholder={placeholderUrl}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <MethodField
            value={formValues.method}
            onChange={e => handleChange('method', e.target.value)}
          />
        </Col>
        <Col xs={6}>
          <SubmitButton disabled={false} />
        </Col>
      </Row>
      <HeadersField
        headers={formValues.headers || []}
        onChangeHeaders={handleHeadersChange}
      />
      <BasicAuthField
        basicAuth={formValues.basicAuth}
        onChangeBasicAuth={handleBasicAuthChange}
      />
      <BodyField
        bodyType={formValues.bodyType}
        formData={formValues.formData}
        data={formValues.data}
        onChangeBodyType={handleBodyTypeChange}
        onChangeFormData={handleFormDataChange}
        onChangeData={handleDataChange}
      />
    </Form>
  );
}

const mapStateToProps = state => ({
  request: state.request.currentRequest, // Adjust as needed for your state shape
  placeholderUrl: state.request.placeholderUrl,
  editMode: isEditMode(state),
});

export default connect(mapStateToProps, {
  ...requestActions,
  ...collectionsActions,
})(Request);

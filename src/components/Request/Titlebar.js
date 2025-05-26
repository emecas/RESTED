import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import UUID from 'uuid-js';

import { immutableCollectionShape } from 'propTypes/collection';
import IconButton from 'components/IconButton';

import { showChooseCollectionModal, showOptionsModal } from 'utils/modal';

import { getCollections } from 'store/collections/selectors';
import { getCollectionsMinimized } from 'store/options/selectors';
import { getEditingRequest, isEditMode } from 'store/config/selectors';

import * as collectionsActions from 'store/collections/actions';
import * as modalActions from 'store/modal/actions';
import * as optionsActions from 'store/options/actions';

import { StyledHeader } from './StyledComponents';

// Removed redux-form imports and related logic

function handleSubmit(props, collectionIndex = 0) {
  const addableRequest = Object.assign({}, props.request, {
    id: UUID.create().toString(),
  });
  props.addRequest(Immutable.fromJS(addableRequest), collectionIndex);
  props.removeModal();
}

function toggleCollectionsExpanded({ collectionsMinimized, updateOption }) {
  updateOption('collectionsMinimized', !collectionsMinimized);
}

function Titlebar(props) {
  const {
    collections,
    removeModal,
    collectionsMinimized,
    isEditing,
    editingRequest,
    // formPristine,
    // formInvalid,
    // touch,
    // The above redux-form props are removed.
  } = props;

  // You may need to reimplement pristine/invalid logic with your new form solution
  // For now, we comment out the block that used formPristine/formInvalid

  // if (formPristine || formInvalid) {
  //   // Debugging for #98
  //   console.log(
  //     'Not adding request because ' +
  //     `formPristine=${formPristine} || formInvalid=${formInvalid}`,
  //     props,
  //   );
  //   // Set URL as touched to give feedback to user
  //   touch('request', 'url');
  //   return;
  // }

  function onAddClick() {
    switch (collections.size) {
      case 0:
        props.addCollection();
      case 1: // eslint-disable-line no-fallthrough
        handleSubmit(props);
        break;
      default:
        showChooseCollectionModal(props).then(
          index => handleSubmit(props, index),
          removeModal,
        );
    }
    // TODO if (requestExists)
    // Modal (do you want to replace?)
  }

  return (
    <StyledHeader>
      {isEditing
        ? `Editing request${editingRequest && editingRequest.name ? ` - ${editingRequest.name}` : ''}`
        : 'Request'}
      <IconButton
        onClick={onAddClick}
        tooltip="Add to collection"
        icon="plus"
        className="pull-right hidden-xs"
      />
      <IconButton
        onClick={() => showOptionsModal(props)}
        tooltip="Options"
        icon="cog"
        className="pull-right"
      />
      <IconButton
        onClick={() => toggleCollectionsExpanded(props)}
        tooltip={`${collectionsMinimized ? 'Show' : 'Hide'} collections`}
        icon={collectionsMinimized ? 'compress' : 'expand'}
        className="pull-right hidden-xs"
      />
    </StyledHeader>
  );
}

Titlebar.propTypes = {
  collections: ImmutablePropTypes.listOf(immutableCollectionShape),
  removeModal: PropTypes.func.isRequired,
  collectionsMinimized: PropTypes.bool,
  isEditing: PropTypes.bool.isRequired,
  editingRequest: PropTypes.shape({
    name: PropTypes.string,
  }),
  addCollection: PropTypes.func.isRequired,
  request: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  addRequest: PropTypes.func.isRequired,
  setModalData: PropTypes.func.isRequired,
  // Removed redux-form-specific propTypes
  // formPristine: PropTypes.bool.isRequired,
  // formInvalid: PropTypes.bool.isRequired,
  // touch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  // request: getFormValues('request')(state), // Remove if you no longer use redux-form for request
  collections: getCollections(state),
  collectionsMinimized: getCollectionsMinimized(state),
  isEditing: isEditMode(state),
  editingRequest: getEditingRequest(state),
  // formPristine: isPristine('request')(state),
  // formInvalid: isInvalid('request')(state),
});

export default connect(mapStateToProps, {
  ...collectionsActions,
  ...modalActions,
  ...optionsActions,
  // touch, // Remove redux-form action
})(Titlebar);

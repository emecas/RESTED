import React from 'react';
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

function handleSubmit(props, collectionIndex = 0) {
  const addableRequest = Object.assign({}, props.request, {
    id: UUID.create().toString(),
  });
  props.addRequest(addableRequest, collectionIndex);
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
    addCollection,
    request,
    addRequest,
    setModalData,
    updateOption,
  } = props;

  function onAddClick() {
    switch (collections.size) {
      case 0:
        addCollection();
      case 1: // eslint-disable-line no-fallthrough
        handleSubmit(props);
        break;
      default:
        showChooseCollectionModal(props).then(
          index => handleSubmit(props, index),
          removeModal,
        );
    }
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
  removeModal: React.PropTypes.func.isRequired,
  collectionsMinimized: React.PropTypes.bool,
  isEditing: React.PropTypes.bool.isRequired,
  editingRequest: React.PropTypes.shape({
    name: React.PropTypes.string,
  }),
  addCollection: React.PropTypes.func.isRequired,
  request: React.PropTypes.object.isRequired,
  addRequest: React.PropTypes.func.isRequired,
  setModalData: React.PropTypes.func.isRequired,
  updateOption: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  collections: getCollections(state),
  collectionsMinimized: getCollectionsMinimized(state),
  isEditing: isEditMode(state),
  editingRequest: getEditingRequest(state),
});

export default connect(mapStateToProps, {
  ...collectionsActions,
  ...modalActions,
  ...optionsActions,
})(Titlebar);

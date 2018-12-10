import React from 'react';
import PropTypes, { bool } from 'prop-types';
import { connect } from 'react-redux';

import { showRightPanel } from '@digix/gov-ui/reducers/gov-ui/actions';
import Icon from '@digix/gov-ui/components/common/elements/icons';

import { Container, TransparentOverlay, PanelContainer, CloseButton } from './style';

const PanelOverlay = props => {
  const { showPanel } = props;
  if (!showPanel || !showPanel.show) return null;

  const closePanel = () => {
    props.showRightPanel({ show: false });
  };

  const toggleBodyOverflow = () => {
    if (!showPanel || !showPanel.show) {
      document.body.classList.remove('modal-is-open');
    } else {
      document.body.classList.toggle('modal-is-open');
    }
  };

  toggleBodyOverflow();

  return (
    <Container>
      <TransparentOverlay />
      <PanelContainer>
        <CloseButton>
          <Icon kind="close" onClick={showPanel.onClose || closePanel} />
        </CloseButton>
        {showPanel.component}
      </PanelContainer>
    </Container>
  );
};

const { object, func, oneOfType } = PropTypes;
PanelOverlay.propTypes = {
  showRightPanel: func,
  showPanel: oneOfType([bool, object]),
};

PanelOverlay.defaultProps = {
  showPanel: undefined,
  showRightPanel: undefined,
};

const mapStateToProps = state => ({
  showPanel: state.govUI.ShowRightPanel,
});

export default connect(
  mapStateToProps,
  { showRightPanel }
)(PanelOverlay);

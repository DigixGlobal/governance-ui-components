import React from 'react';
import PropTypes, { bool } from 'prop-types';
import { connect } from 'react-redux';

import { showRightPanel } from '@digix/gov-ui/reducers/gov-ui/actions';
import Icon from '@digix/gov-ui/components/common/elements/icons';

import { Container, CloseButton } from './style';
import { TransparentOverlay, DrawerContainer } from '../../common-styles';

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
      document.body.classList.add('modal-is-open');
    }
  };

  toggleBodyOverflow();

  return (
    <Container>
      <TransparentOverlay />
      <DrawerContainer>
        <CloseButton onClick={showPanel.onClose || closePanel}>
          <Icon kind="close" />
        </CloseButton>
        {showPanel.component}
      </DrawerContainer>
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

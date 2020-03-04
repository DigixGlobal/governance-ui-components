import _ from 'lodash';
import NavBar from '@digix/gov-ui/components/common/blocks/navbar';
import PropTypes from 'prop-types';
import RightPanelOverlay from '@digix/gov-ui/components/common/blocks/right-panel-overlay';
import SnackBar from '@digix/gov-ui/components/common/elements/snackbar';
import WalletContainer from '@digix/gov-ui/components/common/blocks/wallet';
import React, { Fragment } from 'react';
import { Container, ContentWrapper } from './style';
import './style.css';

function withHeaderAndPanel(WrappedComponent) {
  class TemplateContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        menuOpen: false,
      };
    }

    shouldComponentUpdate = (nextProps, nextState) =>
      !_.isEqual(this.props, nextProps) && !_.isEqual(this.state, nextState);

    render() {
      // TODO: remove sign proof
      return (
        <Fragment>
          <SnackBar />
          <WalletContainer />
          <RightPanelOverlay />
          <NavBar />
          <Container id="App" style={{ height: '100%' }}>
            <ContentWrapper id="page-wrap">
              <WrappedComponent {...this.props} />
            </ContentWrapper>
          </Container>
        </Fragment>
      );
    }
  }

  const { object } = PropTypes;
  TemplateContainer.propTypes = {
    location: object.isRequired,
  };

  return TemplateContainer;
}

export default withHeaderAndPanel;

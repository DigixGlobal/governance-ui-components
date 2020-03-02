import { Button } from '@digix/gov-ui/components/common/elements';
import PropTypes from 'prop-types';
import { Step } from '@digix/gov-ui/pages/dissolution/style';
import { connect } from 'react-redux';
import React from 'react';

const {
  Content,
  Container,
  Text,
} = Step;

class ApproveStep extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { translations } = this.props;
    const t = translations.dissolution;

    return (
      <Container>
        <Content>
          <Text>{t.Approve.instructions}</Text>
        </Content>
        <Button secondary>
          {t.Approve.button}
        </Button>
      </Container>
    );
  }
}

const { object } = PropTypes;

ApproveStep.propTypes = {
  translations: object.isRequired,
};

ApproveStep.defaultProps = {};

const mapStateToProps = state => ({
  translations: state.daoServer.Translations.data,
});

export default connect(mapStateToProps, {})(ApproveStep);

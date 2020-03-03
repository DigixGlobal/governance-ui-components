import PropTypes from 'prop-types';
import { Button } from '@digix/gov-ui/components/common/elements';
import { Step } from '@digix/gov-ui/pages/dissolution/style';
import { withTranslation } from 'react-i18next';
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
    const { t } = this.props;

    return (
      <Container>
        <Content>
          <Text>{t('Approve.instructions')}</Text>
        </Content>
        <Button secondary>
          {t('Approve.button')}
        </Button>
      </Container>
    );
  }
}

const { func } = PropTypes;
ApproveStep.propTypes = {
  t: func.isRequired,
};

export default withTranslation('Dissolution')(ApproveStep);

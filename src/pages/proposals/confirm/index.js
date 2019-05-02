import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../../components/common/elements/index';

import Overview from './overview';
import ProjectDetail from './detail';
import MediaAssets from './media';
import Milestones from './milestones';

import { PreviewWrapper, CTA, LeftCol, RightCol } from './style';

export default class ProjectConfirmation extends React.Component {
  render() {
    const {
      form,
      onBack,
      onSubmit,
      translations,
      translations: {
        common: { buttons },
      },
    } = this.props;
    return (
      <PreviewWrapper>
        <Overview form={form} translations={translations} />
        <ProjectDetail form={form} translations={translations} />
        <MediaAssets form={form} translations={translations} />
        <Milestones form={form} translations={translations} />

        <CTA>
          <LeftCol>
            <Button primary onClick={onBack} data-digix="Confirm-Back-Btn">
              {buttons.back}
            </Button>
          </LeftCol>
          <RightCol>
            <Button primary onClick={onSubmit} data-digix="Confirm-Submit-Btn">
              {buttons.submit}
            </Button>
          </RightCol>
        </CTA>
      </PreviewWrapper>
    );
  }
}

const { object, func } = PropTypes;
ProjectConfirmation.propTypes = {
  form: object.isRequired,
  onBack: func.isRequired,
  onSubmit: func.isRequired,
  translations: object.isRequired,
};

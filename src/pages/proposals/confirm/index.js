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
    const { form, onBack, onSubmit } = this.props;
    return (
      <PreviewWrapper>
        <Overview form={form} />
        <ProjectDetail form={form} />
        <MediaAssets form={form} />
        <Milestones form={form} />

        <CTA>
          <LeftCol>
            <Button primary onClick={onBack}>
              Back
            </Button>
          </LeftCol>
          <RightCol>
            <Button primary onClick={onSubmit}>
              Submit
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
};

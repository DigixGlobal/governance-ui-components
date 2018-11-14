import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../../components/common/elements/index';

import Overview from './overview';
import ProjectDetail from './detail';
import MediaAssets from './media';
import Milestones from './milestones';

import { PreviewWrapper } from './style';

export default class ProjectConfirmation extends React.Component {
  render() {
    const { form, onBack, onSubmit } = this.props;
    return (
      <PreviewWrapper>
        <Overview form={form} />
        <ProjectDetail form={form} />
        <MediaAssets form={form} />
        <Milestones form={form} />
        <Button primary ghost onClick={onBack}>
          Back
        </Button>
        <Button primary ghost onClick={onSubmit}>
          Submit
        </Button>
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

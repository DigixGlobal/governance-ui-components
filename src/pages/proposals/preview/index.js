import React from 'react';
import Overview from './overview';
import ProjectDetail from './detail';
import MediaAssets from './media';
import Milestones from './milestones';

import { PreviewWrapper } from './style';

export default class Preview extends React.Component {
  render() {
    return (
      <PreviewWrapper>
        <Overview />
        <ProjectDetail />
        <MediaAssets />
        <Milestones />
      </PreviewWrapper>
    );
  }
}

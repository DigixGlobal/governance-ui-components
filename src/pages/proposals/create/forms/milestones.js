import React from 'react';
import PropTypes from 'prop-types';
import { TextArea, Input, Select } from '../../../../components/common/elements/index';
import { Fieldset, FormItem, Label, CreateMilestone } from '../style';

class Milestones extends React.Component {
  render() {
    const { onChange } = this.props;
    return (
      <Fieldset>
        <FormItem>
          <Label>Reward Expected</Label>
          <Input placeholder="Insert amnount of reward expected in ETH for completion of project." />
        </FormItem>
        <FormItem>
          <Label>Number of Milestone(s)</Label>
          <Select id="test2" items={[{ text: '1', value: '1' }, { text: '2', value: '2' }]} />
        </FormItem>

        <CreateMilestone>
          <FormItem>
            <Label>Funds Required for This Milestone</Label>
            <Input placeholder="Insert anount of fund expected in ETH for completion of milestone" />
          </FormItem>
          <FormItem>
            <FormItem>
              <Label>Description of Milestone</Label>
              <TextArea placeholder="Explain what will be in this milestone" />
            </FormItem>
          </FormItem>
        </CreateMilestone>
      </Fieldset>
    );
  }
}

const { func } = PropTypes;

Milestones.propTypes = {
  onChange: func.isRequired,
};
export default Milestones;

import React from 'react';
import PropTypes from 'prop-types';
import { TextArea, Input, Select } from '../../../../components/common/elements/index';
import { Fieldset, FormItem, Label, CreateMilestone } from '../style';
// import MilestoneList from '../../milestones';

class Milestones extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      milestones: [],
      milestoneFundings: [],
      milestoneCount: 1,
    };
  }

  handleMilestoneCountChange = e => {
    this.setState({ milestoneCount: e.target.value });
  };

  handleChange = (e, i, field) => {
    const { milestones } = this.state;
    const { onChange } = this.props;
    const { value } = e.target;
    let currentField = milestones[i];
    if (currentField) {
      currentField[field] = value;
    } else {
      currentField = field === 'title' ? { title: value } : { description: value };
    }
    // const data = field === 'title' ? { title: value } : { description: value };

    milestones[i] = currentField;
    this.setState({ milestones: [...milestones] }, () => {
      onChange('milestones', milestones);
    });
  };

  handleFundChange = (e, i) => {
    const { milestoneFundings } = this.state;
    const { onChange } = this.props;
    const { value } = e.target;

    milestoneFundings[i] = value;

    this.setState({ milestoneFundings: { ...milestoneFundings } }, () => {
      onChange('milestoneFundings', milestoneFundings);
    });
  };

  renderMilestoneForm = () => {
    const { milestoneCount } = this.state;
    const fields = [];
    // eslint-disable-next-line
    for (let index = 0; index < milestoneCount; index++)
      fields.push(
        <CreateMilestone key={index}>
          <FormItem>
            <Label>Milestone - #{index + 1} Funds Required for This Milestone</Label>
            <Input
              name={index}
              type="number"
              onChange={e => this.handleFundChange(e, index)}
              placeholder="Insert anount of fund expected in ETH for completion of milestone"
            />
          </FormItem>
          <FormItem>
            <Label>Title This Milestone</Label>
            <Input
              name={index}
              onChange={e => this.handleChange(e, index, 'title')}
              placeholder="Insert anount of fund expected in ETH for completion of milestone"
            />
          </FormItem>
          <FormItem>
            <FormItem>
              <Label>Description of Milestone</Label>
              <TextArea
                name={index}
                onChange={e => this.handleChange(e, index, 'description')}
                placeholder="Explain what will be in this milestone"
              />
            </FormItem>
          </FormItem>
        </CreateMilestone>
      );
    return fields;
  };

  render() {
    const { onChange } = this.props;
    // const { milestones } = this.state;
    return (
      <Fieldset>
        <FormItem>
          <Label>Reward Expected</Label>
          <Input
            type="number"
            id="finalReward"
            onChange={onChange}
            placeholder="Insert amnount of reward expected in ETH for completion of project."
          />
        </FormItem>
        {/* <MilestoneList milestones={milestones} /> */}
        <FormItem>
          <Label>Number of Milestone(s)</Label>
          <Select
            id="test2"
            items={[{ text: '1', value: '1' }, { text: '2', value: '2' }]}
            onChange={this.handleMilestoneCountChange}
          />
        </FormItem>
        {this.renderMilestoneForm()}
      </Fieldset>
    );
  }
}

const { func } = PropTypes;

Milestones.propTypes = {
  onChange: func.isRequired,
};
export default Milestones;

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
    const { milestoneCount, milestoneFundings, milestones } = this.state;
    const { form } = this.props;
    const count = milestoneCount || form.milestones.length - 1;
    const createdMilesones = form.milestones || milestones;
    const fields = [];
    // eslint-disable-next-line
    for (let index = 0; index < count; index++){
      console.log(createdMilesones[index]);
      fields.push(
        <CreateMilestone key={index}>
          <FormItem>
            <Label>Milestone - #{index + 1} Funds Required for This Milestone</Label>
            <Input
              name={index}
              type="number"
              value={milestoneFundings[index]}
              onChange={e => this.handleFundChange(e, index)}
              placeholder="Insert anount of fund expected in ETH for completion of milestone"
            />
          </FormItem>
          <FormItem>
            <Label>Title This Milestone</Label>
            <Input
              name={index}
              value={createdMilesones[index] ? createdMilesones[index].title : ''}
              onChange={e => this.handleChange(e, index, 'title')}
              placeholder="Insert anount of fund expected in ETH for completion of milestone"
            />
          </FormItem>
          <FormItem>
            <FormItem>
              <Label>Description of Milestone</Label>
              <TextArea
                name={index}
                value={createdMilesones[index] ? createdMilesones[index].description : ''}
                onChange={e => this.handleChange(e, index, 'description')}
                placeholder="Explain what will be in this milestone"
              />
            </FormItem>
          </FormItem>
        </CreateMilestone>
      );
    }
    return fields;
  };

  render() {
    const { onChange, form } = this.props;
    const noOfMilestones = this.state.milestoneCount || form.milestones.length;
    // const { milestones } = this.state;
    return (
      <Fieldset>
        <FormItem>
          <Label>Reward Expected</Label>
          <Input
            type="number"
            id="finalReward"
            value={form.finalReward || ''}
            onChange={onChange}
            placeholder="Insert amnount of reward expected in ETH for completion of project."
          />
        </FormItem>
        {/* <MilestoneList milestones={milestones} /> */}
        <FormItem>
          <Label>Number of Milestone(s)</Label>
          <Select
            id="noOfMilestones"
            value={noOfMilestones}
            items={[{ text: '1', value: '1' }, { text: '2', value: '2' }]}
            onChange={this.handleMilestoneCountChange}
          />
        </FormItem>
        {this.renderMilestoneForm()}
      </Fieldset>
    );
  }
}

const { func, object } = PropTypes;

Milestones.propTypes = {
  onChange: func.isRequired,
  form: object.isRequired,
};
export default Milestones;

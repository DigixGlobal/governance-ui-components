import React from 'react';
import PropTypes from 'prop-types';
import { TextArea, Input, Select } from '../../../components/common/elements/index';
import { Fieldset, FormItem, Label, CreateMilestone } from './style';
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

  componentWillMount = () => {
    const { form } = this.props;
    if (form.milestones && form.milestones.length > 0) {
      this.setState({
        milestoneCount: form.milestones.length,
        milestoneFundings: form.milestoneFundings,
      });
    }
  };

  handleMilestoneCountChange = e => {
    const { value } = e.target;
    const { milestones } = this.state;
    if (milestones.length > 1 && milestones.length > Number(value)) {
      milestones.splice(milestones.length - 1);
      // milestoneFundings.splice(milestoneFundings.length - 1);
    }

    this.setState(
      {
        milestoneCount: e.target.value,
        milestones: [...milestones],
        // milestoneFundings: [...milestoneFundings],
      },
      () => {
        this.props.onChange('milestones', milestones);
        // this.props.onChange('milestoneFundings', milestoneFundings);
      }
    );
  };

  handleChange = (e, i, field) => {
    const { milestones } = this.state;
    const { onChange } = this.props;
    const { value } = e.target;
    let currentField = milestones[i];
    // currentField[field] = value;
    if (currentField) {
      currentField[field] = value;
    } else {
      currentField = {};
      // currentField field === 'title' ? { title: value } : { description: value };
      currentField[field] = value;
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

    this.setState({ milestoneFundings: [...milestoneFundings] }, () => {
      onChange('milestoneFundings', milestoneFundings);
    });
  };

  renderMilestoneForm = () => {
    const { milestoneCount, milestones } = this.state;
    const { form } = this.props;
    const count = milestoneCount;
    const createdMilestones = form.milestones || milestones;
    const fields = [];

    // eslint-disable-next-line
    for (let index = 0; index < count; index++){
      fields.push(
        <CreateMilestone key={index}>
          <FormItem>
            <Label>Milestone - #{index + 1} Funds Required for This Milestone</Label>
            <Input
              name={index}
              type="number"
              // value={milestoneFundings[index]}
              // onChange={e => this.handleFundChange(e, index)}
              value={createdMilestones[index] ? createdMilestones[index].fund : ''}
              onChange={e => this.handleChange(e, index, 'fund')}
              placeholder="Insert anount of fund expected in ETH for completion of milestone"
            />
          </FormItem>
          <FormItem>
            <Label>Title This Milestone</Label>
            <Input
              name={index}
              value={createdMilestones[index] ? createdMilestones[index].title : ''}
              onChange={e => this.handleChange(e, index, 'title')}
              placeholder="Insert anount of fund expected in ETH for completion of milestone"
            />
          </FormItem>
          <FormItem>
            <FormItem>
              <Label>Description of Milestone</Label>
              <TextArea
                name={index}
                value={createdMilestones[index] ? createdMilestones[index].description : ''}
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
    const { milestoneCount } = this.state;
    const noOfMilestones = milestoneCount;
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

import React from 'react';
import PropTypes from 'prop-types';

import { Input, Select, TextArea } from '@digix/gov-ui/components/common/elements/index';
import { Notifications } from '@digix/gov-ui/components/common/common-styles';
import {
  CreateMilestone,
  ErrorMessage,
  Fieldset,
  FormItem,
  Label,
} from '@digix/gov-ui/pages/proposals/forms/style';

class Milestones extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      milestones: [],
      milestoneCount: 1,
    };
  }

  componentWillMount = () => {
    const { milestones } = this.props.form;
    if (milestones && milestones.length) {
      this.setState({
        milestones,
        milestoneCount: milestones.length,
      });
    }
  };

  handleMilestoneCountChange = e => {
    let { milestones } = this.state;
    const newCount = Number(e.target.value);
    const oldCount = milestones.length;

    if (oldCount < newCount) {
      // add empty milestones if current count is less than the new count
      // this is needed for the form validation
      for (let i = oldCount + 1; i <= newCount; i += 1) {
        milestones.push({ description: '', funds: '' });
      }
    } else if (oldCount > newCount) {
      // remove milestones if current count exceeds new count
      // NOTE: use Array#slice instead of Array#splice to ensure immutability
      // See: https://stackoverflow.com/a/50579752
      milestones = milestones.slice(0, newCount);
    }

    this.setState(
      {
        milestoneCount: newCount,
        milestones,
      },
      () => {
        this.props.onChange('milestones', milestones);
      }
    );
  };

  handleChange = (e, i, field) => {
    const { milestones } = this.state;
    const { onChange } = this.props;
    const { value } = e.target;

    let currentField = milestones[i];
    if (currentField) {
      currentField[field] = value;
    } else {
      currentField = {};
      currentField[field] = value;
    }

    milestones[i] = currentField;
    this.setState({ milestones: [...milestones] }, () => {
      onChange('milestones', milestones);
    });
  };

  renderMilestoneForm = () => {
    const { milestoneCount, milestones } = this.state;
    const { form } = this.props;
    const count = milestoneCount;
    const createdMilestones = form.milestones || milestones;
    const fields = [];

    for (let index = 0; index < count; index += 1) {
      fields.push(
        <CreateMilestone key={index}>
          <FormItem>
            <Label req>
              Milestone - #{index + 1} Funds Required for This Milestone
              <span>&nbsp;*</span>
            </Label>
            <Input
              name={index}
              type="number"
              value={createdMilestones[index] ? createdMilestones[index].fund : ''}
              onChange={e => this.handleChange(e, index, 'fund')}
              placeholder="Insert amount of fund expected in ETH for completion of milestone"
            />
          </FormItem>

          <FormItem>
            <Label req>
              Description of Milestone
              <span>&nbsp;*</span>
            </Label>
            <TextArea
              name={index}
              value={createdMilestones[index] ? createdMilestones[index].description : ''}
              onChange={e => this.handleChange(e, index, 'description')}
              placeholder="Explain what will be in this milestone"
            />
          </FormItem>
        </CreateMilestone>
      );
    }
    return fields;
  };

  render() {
    const { onChange, form, daoConfig, exceedsLimit } = this.props;
    const { invalidReward } = this.props.errors;
    const { milestoneCount } = this.state;
    const noOfMilestones = milestoneCount;

    const config = daoConfig.data;
    const maxFundingAllowed = config.CONFIG_MAX_FUNDING_FOR_NON_DIGIX;
    const maxMilestoneCount = Number(config.CONFIG_MAX_MILESTONES_FOR_NON_DIGIX);
    const milestonesAllowed = [];

    for (let i = 1; i <= maxMilestoneCount; i += 1) {
      milestonesAllowed.push({
        text: i,
        value: i,
      });
    }

    return (
      <Fieldset>
        {exceedsLimit && (
          <Notifications error data-digix="Milestones-Error">
            Sum of Reward Expected and Milestone Fundings must not exceed&nbsp;
            {maxFundingAllowed} ETH.
          </Notifications>
        )}
        <FormItem>
          <Label error={invalidReward} req>
            Reward Expected
            <span>&nbsp;*</span>
          </Label>
          <Input
            type="number"
            id="finalReward"
            error={invalidReward}
            value={form.finalReward || ''}
            onChange={onChange}
            placeholder="Insert the amount of reward expected in ETH for completion of project."
          />
          {invalidReward && <ErrorMessage>This field is required.</ErrorMessage>}
        </FormItem>
        <FormItem>
          <Label>Number of Milestone(s)</Label>
          <Select
            id="noOfMilestones"
            value={noOfMilestones}
            items={milestonesAllowed}
            onChange={this.handleMilestoneCountChange}
          />
        </FormItem>
        {this.renderMilestoneForm()}
      </Fieldset>
    );
  }
}

const { func, object, bool } = PropTypes;

Milestones.propTypes = {
  daoConfig: object.isRequired,
  errors: object.isRequired,
  exceedsLimit: bool,
  form: object.isRequired,
  onChange: func.isRequired,
};

Milestones.defaultProps = {
  exceedsLimit: false,
};

export default Milestones;

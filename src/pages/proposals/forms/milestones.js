import React from 'react';
import PropTypes from 'prop-types';

import { Input, Select, TextArea } from '@digix/gov-ui/components/common/elements/index';
import { Notifications } from '@digix/gov-ui/components/common/common-styles';
import {
  Fieldset,
  FormItem,
  Label,
  CreateMilestone,
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
    const { form } = this.props;
    if (form.milestones && form.milestones.length > 0) {
      this.setState({
        milestones: form.milestones,
        milestoneCount: form.milestones.length,
      });
    }
  };

  handleMilestoneCountChange = e => {
    const { value } = e.target;
    const { milestones } = this.state;
    if (milestones.length > 1 && milestones.length > Number(value)) {
      milestones.splice(milestones.length - 1);
    }

    this.setState(
      {
        milestoneCount: e.target.value,
        milestones: [...milestones],
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
            <Label>Milestone - #{index + 1} Funds Required for This Milestone</Label>
            <Input
              name={index}
              type="number"
              value={createdMilestones[index] ? createdMilestones[index].fund : ''}
              onChange={e => this.handleChange(e, index, 'fund')}
              placeholder="Insert amount of fund expected in ETH for completion of milestone"
            />
          </FormItem>

          <FormItem>
            <Label>Description of Milestone</Label>
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
          <Label>Reward Expected</Label>
          <Input
            type="number"
            id="finalReward"
            value={form.finalReward || ''}
            onChange={onChange}
            placeholder="Insert the amount of reward expected in ETH for completion of project."
          />
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
  onChange: func.isRequired,
  form: object.isRequired,
  daoConfig: object.isRequired,
  exceedsLimit: bool,
};

Milestones.defaultProps = {
  exceedsLimit: false,
};

export default Milestones;

import React from 'react';
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';

import { Input, Select } from '@digix/gov-ui/components/common/elements/index';
import { Notifications } from '@digix/gov-ui/components/common/common-styles';
import { injectTranslation } from '@digix/gov-ui/utils/helpers';

import {
  CreateMilestone,
  EditorContainer,
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

    this.DEFAULT_MILESTONE_ERRORS = {
      invalidFunds: false,
      invalidDescription: false,
      invalidLink: false,
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
        this.props.onChange('milestones', milestones, false);
      }
    );
  };

  handleChange = (e, i, field) => {
    const { milestones } = this.state;
    const { onChange } = this.props;
    const value = e.target ? e.target.value : e;

    let currentField = milestones[i];
    if (currentField) {
      currentField[field] = value;
    } else {
      currentField = {};
      currentField[field] = value;
    }

    milestones[i] = currentField;
    this.setState({ milestones: [...milestones] }, () => {
      onChange('milestones', milestones, true, field, i);
    });
  };

  renderMilestoneForm = () => {
    const { milestoneCount, milestones } = this.state;
    const {
      form,
      translations: { common, project },
    } = this.props;

    const errors = this.props.errors.milestones;
    const count = milestoneCount;
    const createdMilestones = form.milestones || milestones;
    const fields = [];

    for (let index = 0; index < count; index += 1) {
      const createMilestone = createdMilestones[index];
      const fund = createMilestone ? createMilestone.fund : '';
      const description = createMilestone ? createMilestone.description : '';

      let error = errors ? errors[index] : null;
      error = error || this.DEFAULT_MILESTONE_ERRORS;
      const { invalidFunds, invalidDescription, invalidLink } = error;
      const hasDescriptionError = invalidDescription || invalidLink;

      fields.push(
        <CreateMilestone key={index}>
          <FormItem>
            <Label error={invalidFunds} req>
              {project.milestone} - #{index + 1} {project.fundsRequiredForMilestone}
              <span>&nbsp;*</span>
            </Label>
            <Input
              name={index}
              type="number"
              value={fund || ''}
              error={invalidFunds}
              onChange={e => this.handleChange(e, index, 'fund')}
              placeholder={project.milestonePlaceholder}
            />
            {invalidFunds && <ErrorMessage>{common.errors.fieldIsRequired}</ErrorMessage>}
          </FormItem>

          <FormItem>
            <Label req>
              {project.milestoneDescription}
              <span>&nbsp;*</span>
            </Label>
            <EditorContainer error={hasDescriptionError}>
              <ReactQuill
                name={index}
                value={description || ''}
                onChange={e => this.handleChange(e, index, 'description')}
                placeholder={project.milestoneDescriptionPlaceholder}
              />
            </EditorContainer>
            {invalidDescription && <ErrorMessage>{common.errors.fieldIsRequired}</ErrorMessage>}
            {invalidLink && (
              <ErrorMessage>
                <Markdown source={common.errors.invalidLink} escapeHtml={false} />
              </ErrorMessage>
            )}
          </FormItem>
        </CreateMilestone>
      );
    }

    return fields;
  };

  render() {
    const {
      onChange,
      form,
      daoConfig,
      exceedsLimit,
      translations: { project, common },
    } = this.props;
    const { invalidReward } = this.props.errors;
    const { milestoneCount } = this.state;
    const noOfMilestones = milestoneCount;

    const config = daoConfig.data;
    const maxFundingAllowed = config.CONFIG_MAX_FUNDING_FOR_NON_DIGIX;
    const maxMilestoneCount = Number(config.CONFIG_MAX_MILESTONES_FOR_NON_DIGIX);
    const milestonesAllowed = [];

    const injected = injectTranslation(project.editFundingError, {
      limit: maxFundingAllowed,
    });
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
            {injected}
          </Notifications>
        )}
        <FormItem>
          <Label error={invalidReward} req>
            {project.rewardExpected}
            <span>&nbsp;*</span>
          </Label>
          <Input
            type="number"
            id="finalReward"
            error={invalidReward}
            value={form.finalReward || ''}
            onChange={onChange}
            placeholder={project.rewardExpectedPlaceholder}
          />
          {invalidReward && <ErrorMessage>{common.errors.fieldIsRequired}</ErrorMessage>}
        </FormItem>
        <FormItem>
          <Label>{project.numberOfMilestones}</Label>
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
  translations: object.isRequired,
};

Milestones.defaultProps = {
  exceedsLimit: false,
};

export default Milestones;

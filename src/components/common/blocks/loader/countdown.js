import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Countdown from 'react-countdown-now';
import ScreenLoader from '@digix/gov-ui/components/common/blocks/loader/screen';
import { getDaoDetails } from '@digix/gov-ui/reducers/info-server/actions';
import { showCountdownPage } from '@digix/gov-ui/reducers/gov-ui/actions';

import {
  Content,
  CountdownWrapper,
  Cta,
  Divider,
  Label,
  ParticipateButton,
  Preloaders,
  Timer,
  TimerContainer,
} from '@digix/gov-ui/components/common/blocks/loader/style';

const CountdownRenderer = props => {
  const { hours, minutes, seconds, completed } = props;
  if (completed) {
    props.getDaoDetails().then(() => {
      props.showCountdownPage({ show: false });
    });
  }

  return (
    <Timer>
      <div>
        <span>{hours}</span>
        <span>Hours</span>
      </div>
      <Divider />
      <div>
        <span>{minutes}</span>
        <span>Minutes</span>
      </div>
      <Divider />
      <div>
        <span>{seconds}</span>
        <span>Seconds</span>
      </div>
    </Timer>
  );
};

class CountdownPage extends React.Component {
  constructor(props) {
    super(props);

    // add additional buffer time to the countdown since it takes a while
    // for info-server to update after the countdown ends
    this.BUFFER_TIME = 5000;
  }

  componentDidMount() {
    this.props.getDaoDetails();
  }

  render() {
    let { startOfNextQuarter } = this.props.DaoDetails;
    startOfNextQuarter *= 1000;
    const launchDate = startOfNextQuarter + this.BUFFER_TIME;

    return (
      <Preloaders>
        <CountdownWrapper>
          <Content countdown>
            <h1>Creating a tokenised future together.</h1>
            <h2>
              The DigixDAO Governance platform enables those who believe in the democratization of
              hard assets like Gold in an increasingly digital and uncertain world to build the
              Digix ecosystem together.
            </h2>
          </Content>
          <TimerContainer>
            <Label>
              <div />
              <div>
                Countdown To Launch <span>&middot;</span> 03.30
              </div>
              <div />
            </Label>
            <Countdown
              daysInHours
              date={launchDate}
              getDaoDetails={this.props.getDaoDetails}
              renderer={CountdownRenderer}
              showCountdownPage={this.props.showCountdownPage}
            />
            <Cta>
              <ParticipateButton reverse large>
                View the manual on how to participate in DigixDAO
              </ParticipateButton>
            </Cta>
          </TimerContainer>
        </CountdownWrapper>
        <ScreenLoader />
      </Preloaders>
    );
  }
}

const { bool, func, object, string } = PropTypes;

CountdownRenderer.propTypes = {
  completed: bool.isRequired,
  getDaoDetails: func.isRequired,
  hours: string.isRequired,
  minutes: string.isRequired,
  seconds: string.isRequired,
  showCountdownPage: func.isRequired,
};

CountdownPage.propTypes = {
  DaoDetails: object,
  getDaoDetails: func.isRequired,
  showCountdownPage: func.isRequired,
};

CountdownPage.defaultProps = {
  DaoDetails: undefined,
};

const mapStateToProps = ({ infoServer }) => ({
  DaoDetails: infoServer.DaoDetails.data,
});

export default connect(
  mapStateToProps,
  {
    getDaoDetails,
    showCountdownPage,
  }
)(CountdownPage);

import React from 'react';
import ScreenLoader from '@digix/gov-ui/components/common/blocks/loader/screen';
import {
  Preloaders,
  CountdownWrapper,
  Content,
  TimerContainer,
  Timer,
  Divider,
  Cta,
  Label,
  ParticipateButton,
} from '@digix/gov-ui/components/common/blocks/loader/style';

class Countdown extends React.Component {
  render() {
    return (
      <Preloaders>
        <CountdownWrapper>
          <Content countdown>
            <h1>
              Introducing <span>DigixDAO</span> governance,
              <br />
              powered by the Ethereum blockchain.
            </h1>
            <h2>
              Our community-based governance system makes it possible to all DGD participants to
              submit a proposal and equally contribute to the Digix ecosystem.
            </h2>
          </Content>
          <TimerContainer>
            <Label>
              <div />
              <div>
                Countdown To Launch <span>&middot;</span> 03.28
              </div>
              <div />
            </Label>
            <Timer>
              <div>
                <span>48</span>
                <span>Hours</span>
              </div>
              <Divider />
              <div>
                <span>11</span>
                <span>Minutes</span>
              </div>
              <Divider />
              <div>
                <span>34</span>
                <span>Seconds</span>
              </div>
            </Timer>
            <Cta>
              <ParticipateButton reverse large>
                See Manual on how to participate in DigixDAO
              </ParticipateButton>
            </Cta>
          </TimerContainer>
        </CountdownWrapper>
        <ScreenLoader />
      </Preloaders>
    );
  }
}

export default Countdown;

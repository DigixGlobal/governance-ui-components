import styled from 'styled-components';
import { Input } from '@digix/gov-ui/components/common/elements/index';
import { Message } from '@digix/gov-ui/components/common/common-styles';

export const CallToAction = styled.div`
  margin-top: 2rem;
`;

export const UsernameInput = styled(Input)`
  text-transform: lowercase;
`;

export const NotificationMessage = styled(Message)`
  p {
    margin-bottom: 0;
  }
`;

import React from 'react';
import { Button } from '../index';
import { ModalWrapper, ModalContent } from './style';

export default class Modal extends React.Component {
  render() {
    return (
      <ModalWrapper>
        <ModalContent>
          {/* {children} */}
          <Button primary ghost onClick={this.state}>
            Close
          </Button>
        </ModalContent>
      </ModalWrapper>
    );
  }
}

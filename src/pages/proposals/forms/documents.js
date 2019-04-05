/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment } from 'react';
import { Button, Icon } from '@digix/gov-ui/components/common/elements/index';
import {
  CallToAction,
  Heading,
  Header,
  Centered,
} from '@digix/gov-ui/pages/proposals/forms/base-style';
import {
  Fieldset,
  FormItem,
  Label,
  MediaUploader,
  ImageItem,
  ImageHolder,
  CloseButton,
  AddMoreButton,
  Note,
} from '@digix/gov-ui/pages/proposals/forms/style';

class Documents extends React.Component {
  renderDocuments = () => (
    <ImageItem>
      <CloseButton kind="text">
        <Icon kind="trash" /> Remove
      </CloseButton>

      <img src="/" />
    </ImageItem>
  );

  render() {
    return (
      <Fragment>
        <Button kind="text" underline>
          Back to Project
        </Button>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <Header>
          <Heading>Add Updates</Heading>
          <CallToAction>
            <Button primary>Add</Button>
          </CallToAction>
        </Header>

        <Fieldset>
          <FormItem>
            <Label>Document 1</Label>
            <MediaUploader>
              <div>
                <Button
                  kind="upload"
                  accept="image/*"
                  primary
                  fluid
                  large
                  multiple
                  id="image-upload"
                  type="file"
                  caption="Upload Document"
                >
                  <Note>
                    Document must be in JPEG / PNG / PDF/ format &amp; file size must be lesser than
                    5MB.
                  </Note>
                </Button>
              </div>

              <ImageHolder>{this.renderDocuments()}</ImageHolder>
            </MediaUploader>
          </FormItem>
          <FormItem>
            <Centered>
              <AddMoreButton kind="text">
                <Icon kind="plus" />
                Add More
              </AddMoreButton>
            </Centered>
          </FormItem>
        </Fieldset>
      </Fragment>
    );
  }
}

export default Documents;

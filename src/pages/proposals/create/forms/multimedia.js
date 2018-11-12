import React from 'react';
// import PropTypes from 'prop-types';

import { Button, TextArea, Select, Input } from '../../../../components/common/elements/index';
import { Fieldset, FormItem, Label, MediaUploader, ImageHolder, LeftCol, RightCol } from '../style';

class Details extends React.Component {
  render() {
    return (
      <Fieldset>
        <FormItem>
          <Label>Number of Image(s)</Label>
          <Select id="test" items={[{ text: '1', value: '1' }, { text: '2', value: '2' }]} />
        </FormItem>
        <FormItem>
          <Label>Image 1</Label>
          <MediaUploader>
            <LeftCol>
              <Button primary ghost>
                Upload Image
              </Button>
            </LeftCol>
            <RightCol>
              <ImageHolder>&nbsp;</ImageHolder>
            </RightCol>
          </MediaUploader>
        </FormItem>
      </Fieldset>
    );
  }
}

export default Details;

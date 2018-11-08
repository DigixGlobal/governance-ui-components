import React from 'react';

import { Button, Input, TextArea, Select } from '../../../components/common/elements/index';
import {
  CreateWrapper,
  TabPanel,
  MenuItem,
  Header,
  LeftCol,
  RightCol,
  Heading,
  Fieldset,
  FormItem,
  Label,
  MediaUploader,
  ImageHolder,
  CreateMilestone,
} from './style';

class CreateProposal extends React.Component {
  render() {
    return (
      <CreateWrapper>
        <TabPanel>
          <MenuItem active>Overview</MenuItem>
          <MenuItem>Project Detail</MenuItem>
          <MenuItem>Multimedia</MenuItem>
          <MenuItem>Milestone</MenuItem>
        </TabPanel>
        <Header>
          <LeftCol>
            <Heading>Basic Project Information</Heading>
          </LeftCol>
          <RightCol>
            <Button secondary>Preview</Button>
            <Button primary ghost>
              Next
            </Button>
          </RightCol>
        </Header>
        <Fieldset>
          <FormItem>
            <Label>Project Title</Label>
            <Input placeholder="Implementation of Silver tokens" />
          </FormItem>
          <FormItem>
            <Label>Short Description</Label>
            <TextArea placeholder="Max 200 characters" />
          </FormItem>
        </Fieldset>
        <Fieldset>
          <FormItem>
            <Label>Project Information</Label>
            <TextArea placeholder="TO DO (Dev): Update this component to a simple text editor." />
          </FormItem>
        </Fieldset>
        <Fieldset>
          <FormItem>
            <Label>Number of Image(s)</Label>
            <Select id="test" items={[{ text: '1', value: '1' }, { text: '2', value: '2' }]} />
          </FormItem>
          <FormItem>
            <Label>Image 1</Label>
            <Input placeholder="Max 200 characters" />
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
          <FormItem>
            <Label>Image 2</Label>
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
        <Fieldset>
          <FormItem>
            <Label>Reward Expected</Label>
            <Input placeholder="Insert amnount of reward expected in ETH for completion of project." />
          </FormItem>
          <FormItem>
            <Label>Number of Milestone(s)</Label>
            <Select id="test2" items={[{ text: '1', value: '1' }, { text: '2', value: '2' }]} />
          </FormItem>

          <CreateMilestone>
            <FormItem>
              <Label>Funds Required for This Milestone</Label>
              <Input placeholder="Insert anount of fund expected in ETH for completion of milestone" />
            </FormItem>
            <FormItem>
              <FormItem>
                <Label>Description of Milestone</Label>
                <TextArea placeholder="Explain what will be in this milestone" />
              </FormItem>
            </FormItem>
          </CreateMilestone>
        </Fieldset>
      </CreateWrapper>
    );
  }
}

export default CreateProposal;

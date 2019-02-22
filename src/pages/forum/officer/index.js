import React from 'react';
import {
  ForumDashboard,
  Title,
  Search,
  Fieldset,
  SearchResult,
  Item,
  Username,
  ButtonBan,
  SearchButton,
} from '@digix/gov-ui/pages/forum/officer/style';
import { Icon } from '@digix/gov-ui/components/common/elements/index';

class ForumOfficerDashboard extends React.Component {
  render() {
    return (
      <ForumDashboard>
        <Title>User Database</Title>
        <Fieldset>
          <Search className="search" placeholder="Search for user..." />
          <div className="icons-container">
            <SearchButton>
              <Icon kind="magnifier" />
            </SearchButton>
          </div>
        </Fieldset>
        <SearchResult column>
          <Item>
            <Username>hodl_godl</Username>
            <ButtonBan secondary>Ban</ButtonBan>
          </Item>
          <Item>
            <Username>_cryptobabe</Username>
            <ButtonBan secondary reverse>
              Unban
            </ButtonBan>
          </Item>
          <Item>
            <Username>dao_me_not</Username>
            <ButtonBan secondary reverse>
              Unban
            </ButtonBan>
          </Item>
          <Item>No such user found on the database</Item>
        </SearchResult>
      </ForumDashboard>
    );
  }
}

export default ForumOfficerDashboard;

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchUserQuery, UserMutations } from '@digix/gov-ui/api/graphql-queries/users';
import { showHideAlert } from '@digix/gov-ui/reducers/gov-ui/actions';
import { withApollo } from 'react-apollo';
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
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };

    this.ERROR_MESSAGES = {
      banFailure: 'Cannot ban user',
      searchFailure: 'Cannot search user',
      unbanFailure: 'Cannot unban user',
    };

    this.SUCCESS_MESSAGES = {
      ban: displayName => `User ${displayName} successfully banned`,
      unban: displayName => `User ${displayName} successfully unbanned`,
    };
  }

  search = e => {
    e.preventDefault();
    const input = document.querySelector('.search').value;
    const apollo = this.props.client;

    apollo
      .query({
        fetchPolicy: 'network-only',
        query: searchUserQuery,
        variables: {
          query: input,
        },
      })
      .then(result => {
        const users = result.data.searchDaoUsers.nodes;
        this.setState({ users });
      })
      .catch(() => {
        this.props.showHideAlert({
          message: this.ERROR_MESSAGES.searchFailure,
        });
      });
  };

  toggleBan = user => {
    const { users } = this.state;
    const { displayName, id, isBanned } = user;
    const apollo = this.props.client;

    const method = isBanned ? 'unban' : 'ban';
    apollo
      .mutate({
        mutation: UserMutations[method],
        variables: { id },
      })
      .then(response => {
        const responseKey = isBanned ? 'unbanUser' : 'banUser';
        const { errors } = response.data[responseKey];
        if (errors.length) {
          this.props.showHideAlert({
            message: errors[0].message,
          });

          return;
        }

        users.forEach(u => {
          if (u.id === id) {
            u.isBanned = !u.isBanned;
          }
        });

        this.setState({ users });
        this.props.showHideAlert({
          message: this.SUCCESS_MESSAGES[method](displayName),
        });
      })
      .catch(() => {
        const catchError = isBanned ? 'unbanFailure' : 'banFailure';
        this.props.showHideAlert({
          message: this.ERROR_MESSAGES[catchError],
        });
      });
  };

  renderSearchItem(user) {
    const { displayName, isBanned } = user;
    const label = isBanned ? 'Unban' : 'Ban';
    return (
      <Item>
        <Username data-digix="Search-Result-Username">{displayName}</Username>
        <ButtonBan
          data-digix="User-Banned-Btn"
          secondary
          reverse={isBanned}
          onClick={() => this.toggleBan(user)}
        >
          {label}
        </ButtonBan>
      </Item>
    );
  }

  render() {
    const { users } = this.state;
    return (
      <ForumDashboard>
        <Title>User Database</Title>
        <form>
          <Fieldset>
            <Search
              data-digix="Search-User-Field"
              className="search"
              placeholder="Search for user..."
              onSubmit={e => this.search(e)}
            />
            <div className="icons-container">
              <SearchButton data-digix="Search-User-Btn" onClick={e => this.search(e)}>
                <Icon kind="magnifier" />
              </SearchButton>
            </div>
          </Fieldset>
        </form>
        <SearchResult column data-digix="Search-Result">
          {users.length === 0 && <Item>No such user found on the database</Item>}
          {users.map(user => this.renderSearchItem(user))}
        </SearchResult>
      </ForumDashboard>
    );
  }
}

const { func, object } = PropTypes;

ForumOfficerDashboard.propTypes = {
  client: object.isRequired,
  showHideAlert: func.isRequired,
};

const mapStateToProps = () => ({});
export default withApollo(
  connect(
    mapStateToProps,
    {
      showHideAlert,
    }
  )(ForumOfficerDashboard)
);

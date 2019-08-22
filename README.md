# Governance DAO

This repository handles the frontend for
[Digix Governance](https://community.digix.global/#/). For reference, please
view the following materials to familiarize yourself with how the DAO works:

- [Site Manual](https://ipfs.infura.io/ipfs/QmXg8UNeoStwFc561QzRedkpXJRZAnwikobRydjw3CDem9)
- [Governance Model](https://drive.google.com/file/d/1IvtL-iY-cj1W2WfTshchCALYw1VGGyjt/view)
- [Proposal State Diagram](https://github.com/DigixGlobal/dao-contracts/blob/master/doc/digixdao-proposal-state-diagram.jpg)

## Table of Contents

- [Getting Started](#getting-started)
- [Development Guidelines](#development-guidelines)
  - [Creating a Pull Request](#creating-a-pull-request)
  - [General Guidelines](#general-guidelines)
- [Data Sources](#data-sources)
- [Translations](#translations)
- [Testing](#testing)
- [License](#license)

## Getting Started

### Prerequisites

Please clone and set up the following repositories to run the whole DAO system:

- [dao-contracts](https://github.com/DigixGlobal/dao-contracts): contains the
  blockchain contracts
- [dao-server](https://github.com/DigixGlobal/dao-server): runs the KYC and
  non-blockchain-related data
- [info-server](https://github.com/DigixGlobal/info-server): IPFS and
  blockchain-related data
- [governance-ui](https://github.com/DigixGlobal/governance-ui): responsible for
  loading the wallet and running the whole frontend system.
  `governance-ui-components` is considered a dependency of this repository

### Installation

For this repository, simply install all the necessary npm packages with `npm i`.

Once all these systems have been set up, you can run the DAO frontend system by
running `npm run start` in `governance-ui`. You can view the site at
`https://localhost:3000`.

## Development Guidelines

### Creating a Pull Request

When creating a Pull Request, please base your changes on the `develop` branch.

Prepend your commit message with **[FEATURE]** or **[FIX]** to describe the type
of change. Include a description of the changes, as well as a **Test Plan** to
be followed to verify these changes. For bug fixes, please also include steps to
replicate the bug.

Consult the [PR Template](./PULL_REQUEST_TEMPLATE.md) for more information on
how to submit a pull request. Please view PR
[#312](https://github.com/DigixGlobal/governance-ui-components/pull/312) for a
sample commit message to follow.

### General Guidelines

- **Style Guide**: Use styled components when adding new designs to the website.
  You can view the theme variables in
  [src/theme/light.js](https://github.com/DigixGlobal/governance-ui-components/blob/develop/src/theme/light.js).
  Please follow the official
  [Style Guide](https://github.com/DigixGlobal/governance-ui-components/wiki/Style-Guide)
  to keep things consistent and up to standard.
- **data-digix attributes**: Please add `data-digix` attributes to important
  HTML elements. These are used by QA as locators in their automated test scripts.
- **Data Fetching**: New endpoints should be implemented using GraphQL. See
  [here](https://github.com/DigixGlobal/governance-ui-components/tree/develop/src/api/graphql-queries)
  for examples of how these are implemented.

## Data Sources

Currently, the DAO fetches data from three sources: `dao-server`, `info-server`,
and `GraphQL`.

New endpoints should be implemented in `GraphQL` since this is the de facto
standard for data fetching in the DAO. Legacy endpoints that are still in use
are fetched from the `dao-server` and `info-server`. Each has its own redux
store to keep the data separate and easy to handle.

### dao-server (legacy endpoints)

Data fetched from the `dao-server` include non-blockchain-related data such as
proposal likes, comments, etc. See
[here](https://github.com/DigixGlobal/governance-ui-components/tree/develop/src/reducers/dao-server)
to view the redux store for it.

A special case is created for **comments** data. These are fetched directly and
are not stored in the redux. The relevant code for this can be found in
[src/api/comments.js](https://github.com/DigixGlobal/governance-ui-components/blob/develop/src/api/comments.js)
and [src/api/users.js](https://github.com/DigixGlobal/governance-ui-components/blob/develop/src/api/users.js).

### info-server (legacy endpoints)

Data fetched from the `info-server` include blockchain-related data such as
address details, proposal details, etc. See
[here](https://github.com/DigixGlobal/governance-ui-components/tree/develop/src/reducers/info-server)
to view the redux store for it.

### gov-ui (UI Redux Store)

A separate redux store has been created to handle UI data such as setting the
language and toggling alerts and menus. See
[here](https://github.com/DigixGlobal/governance-ui-components/tree/develop/src/reducers/gov-ui)
to view the redux store for it.

### GraphQL

New endpoints are implemented in `GraphQL` to consolidate the data from
`dao-server` and `info-server` in one place. We suggest installing
[apollo](https://www.apollographql.com/docs/react/) in your browser to help you
with development. The schema docs for `dao-server` queries should be available
via apollo once you load a participant wallet.

For `info-server` queries, you can run the `info-server` system and view the
schema in `http://localhost:3001/api`. After signing your wallet, you will need
to add the challenge response in the **HTTP HEADERS** to view the schema.
For example,

```json
{
  "address": "0x519774B813Dd6dE58554219F16C6Aa8350b8eC99",
  "challenge_id": "3",
  "message": "I am proving ownership of this address, to be used in DigixDAO Governance Platform. (5a5dfeea052f10a8fb75665b069511d7)",
  "signature": "0x0e0864b2951a26c01c82431a911666a3a813356b9965dfb7e252056ca1b3b09001969e989908dc58504ccca8dec76f7493c733a2842599c27521981339dfb9711c"
}
```

You can view the implementation for using GraphQL queries
[here](https://github.com/DigixGlobal/governance-ui-components/tree/develop/src/api/graphql-queries).

## Translations

Translations for each language are set in json files in
[src/translations](https://github.com/DigixGlobal/governance-ui-components/tree/develop/src/translations).
When adding new text for one language, please provide the same key for all other
languages so that it compiles correctly.

You can supply the same English translation for all the languages and Digix will
take care of updating the correct translation for each respective language.

### Formatting

You can use `markdown` in the json files if you need to add simple formatting.
If you want to inject variables, enclose the word in double curly braces `{{}}`.
For0 example:
```
The {{fruit}} is **{{color}}**
```

will render as "The apple is **red**" when you provide the values for `fruit`
(apple) and `color` (red).

### Usage

Compile the translations using the following script:

```bash
npm run ui:generate-translations
```

The translations are already being passed to the props, so you can access them
directly via `this.props.translations`. See
PR [#209](https://github.com/DigixGlobal/governance-ui-components/pull/209/files)
for an example of how it's implemented in the DAO.

The translations will be displayed as plain text. To render translations that
use markdown formatting to html, use
[react-markdown](https://github.com/rexxars/react-markdown).

```javascript
import Markdown from 'react-markdown';

render () {
  const { foo } = this.props.translations;
  return <Markdown source={foo} escapeHtml={false} />;
}
```

For injecting variables into  translations, you can use the `injectTranslation`
helper like so:

```javascript
import { injectTranslation } from '@digix/gov-ui/utils/helpers';

const translation = "The {{fruit}} is {{color}}.";
const injected = injectTranslation(translation, {
  fruit: 'apple',
  color: 'red',
});

console.log(injected); // "The apple is red."
```

You can also add `data-digix` attributes with `injectTranslation`. See PR
[#214](https://github.com/DigixGlobal/governance-ui-components/pull/214) for
more information. Also note that using `injectTranslation` will automatically
return a `<ReactMarkdown/>` component, so there's no need to worry about
rendering it to html.

## Testing and Scripts

Automation scripts can be found in
[dao-test-automation](https://github.com/DigixGlobal/dao-test-automation).

### Change the timer for proposal stages

You can change the timer for different phases of the proposal lifecycle if you
want to shorten or lengthen them for testing purposes. To do so, change the
values (set in seconds) in the
[.env](https://github.com/DigixGlobal/dao-contracts/blob/dev/.env) file and
re-compile the contracts.

### Teleport to the next phase

To fast-forward to the next phase, you can run any of the following scripts in `dao-contracts`.

```bash
npm run teleport:locking_phase
```

```bash
npm run teleport:main_phase
```

## License

Copyright DIGIXGLOBAL PRIVATE LIMITED

The code in this repository is licensed under the
[BSD-3 Clause](https://opensource.org/licenses/BSD-3-Clause)
BSD-3-clause, 2017

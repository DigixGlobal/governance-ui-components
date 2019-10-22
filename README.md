# Governance DAO

This repository handles the frontend for
[Digix Governance](https://community.digix.global/#/).

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

Please visit out [wiki](https://github.com/DigixGlobal/governance-ui-components/wiki) for more information on how to contribute to this project.

## License

Copyright DIGIXGLOBAL PRIVATE LIMITED

The code in this repository is licensed under the
[BSD-3 Clause](https://opensource.org/licenses/BSD-3-Clause)
BSD-3-clause, 2017

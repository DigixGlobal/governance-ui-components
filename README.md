# Dissolution

## Setup
Make sure to clone the following in the same directory:

- [dao-contracts](https://github.com/DigixGlobal/dao-contracts)
- [acid-solidity](https://github.com/DigixGlobal/acid-solidity)
- [dissolution-subgraph](https://github.com/DigixGlobal/dissolution-subgraph)
- [governance-ui](https://github.com/DigixGlobal/governance-ui)
- [governance-ui-components](https://github.com/DigixGlobal/governance-ui-components)

### Backend Setup
Follow the setup instructions in the **dissolution-subgraph** [README](https://github.com/DigixGlobal/dissolution-subgraph).

Then run `docker-compose up` to run the backend services.

You can access graphiql through https://localhost:8000/subgraphs/name/DigixGlobal/DissolutionSubgraph/graphql

#### Accessing Truffle

To access the truffle console for `acid-solidity` or `dao-contracts`, do the following commands in `dissolution-subgraph`:
```
# SSH to ash shell
docker-compose exec subgraph ash

# change to /usr/src/dao-contracts if accessing truffle for dao-contracts
cd /usr/src/acid-solidity

# run truffle
./node_modules/.bin/truffle console
```

Some useful commands to do in the truffle console:
```
var accounts
web3.eth.getAccounts((e,r)=>accounts=r)
var dgd = MockDgd.at(MockDgd.address)

# check transaction
web3.eth.getTransactionReceipt(<txHash>)

# get DGD balance
dgd.balanceOf(<address>)

# send DGD to an address
dgd.transfer(<address>, 100e9)

# send ETH to an address
web3.eth.sendTransaction({ from: accounts[0], to: <address>, value: web3.toWei(10, 'ether') })
```

### Frontend Setup
- Run `npm install` on `governance-ui-components`.
- Run `npm install` on `governance-ui`.
- In `governance-ui`, run `npm run start`. This will start the app in development mode.
- App can be viewed in https://localhost:3000/#/
  - **[HACK]** If the page does not load and you encounter an error with `EventEmitter3` in the console logs, edit `governance-ui-components/node_modules/subscriptions-transport-ws/dist/client.js` and change line 43 to `this.eventEmitter = new eventemitter3_1();`. This is an issue with peer dependencies for npm packages; will fix soon but do this for now to make it work. [Ref](https://github.com/apollographql/subscriptions-transport-ws/issues/267)
- Check that the page loads fine before proceeding to the next steps.

## Testing
You can use the local test accounts (`account4`, `account8`, etc.), same as the ones we used when testing DAO locally. Running the docker container will automatically seed these test accounts for you.

### Test Cases
#### LOAD WALLET
- Click `Proceed` on the modal. This should open the Load Wallet panel.
- You should be able to load any wallet.
- If the user has zero DGD in their balance, the UI will show them the logout button.

#### UNLOCK
- This will only be available for users who still have locked DGD. If they don't have locked DGD, the UI will skip this step and proceed to the next.
- To unlock, just click on the button then sign with your wallet.
- User can proceed to the next step only after the transaction is successful.

#### BURN
- User should be able to see their DGD balance and the ETH they'll get after conversion.
- To burn, just click on the button then sign with your wallet.
- When the transaction is successful, you should see the logout button.

### Deployment
Make sure to update `package.json` with the correct version of `@digix/acid-contracts` and `@digix/dao-contracts`.

**LOCAL:**
- `file:../acid-solidity`
- `file:../dao-contracts`

**KOVAN:**
- `@digix/acid-contracts@0.1.1`
- `@digix/dao-contracts@0.0.7`

**PRODUCTION:**
- `@digix/acid-contracts@1.0.0`
- `@digix/dao-contracts@1.1.0`

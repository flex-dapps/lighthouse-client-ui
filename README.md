# 🚨 Lighthouse Front-end Client

Spin up a dev environment:

1. Clone repo  
2. Fetch all module dependencies: `$: yarn`  
3. Copy `.env.example` to `.env.local/.env` and update values (see below)  

**Note: Ensure you have a Lighthouse Beacon Node, Validator Client and ETH 1 node running**  
See https://lighthouse-book.sigmaprime.io/api.html for more information

##### Local Development / Testing
`yarn start`

##### env variables
`REACT_APP_STAKING_REWARD_MULTIPLIER=1.6819` basic annual staking rewards per node
`REACT_APP_MNEMONIC_CONFIRMATION_TYPE=ALL` ALL|TWOROWS type of mnemonic confirmation to perform
`REACT_APP_ALLOW_MNEMONIC_CONFIRMATION_SKIP=false` true|false to allow easy skipping on mnemonic confirmation (use when testing)
`REACT_APP_HEALTH_POLLING_INTERVAL=5000` interval (in ms) to poll client for health updates
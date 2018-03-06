# Orocolo Ethereum Wallet

Orocolo is an Angular ^5.0 Ethereum Wallet with the following features:

- Generate a new wallet with a private key file or mnemonic 
- Unlock your wallet via a JSON private key file or a mnemonic
- View and send ETHer funds
- Add ERC20 token addresses, list the token funds and send tokens to another address

## Usage

- Create a new wallet in `/new-wallet`
- Unlock a wallet in `/login`
- List your ETH and Token balances in `/balances`
- Add a new token in `/add-token`
- Send funds to another address in `/transfer`

## Running in local development

Orocolo Wallet works with the Ropsten Testnet, however, for faster development I recommend installing the [Ganache UI](http://truffleframework.com/ganache/)

Open the Ganache application and verify that the RPC Server is `HTTP://127.0.0.1:7545`

Make sure that the `./src/environments/environment.ts` file has this config: 

```
export const environment = {
  production: false,
  development: false,
  local: true,
};
```

Follow these steps in order to run a clone of Orocolo Wallet:

### Clone this repo

```
git clone git@github.com:netpoe/orocolo-wallet.git
```

### Run npm install

```
cd orocolo-wallet; npm install
```

### Creating a Firebase database

Orocolo Wallet stores the wallet addreses information in a firebase database instance.

Go to [https://firebase.google.com/](https://firebase.google.com/) and create a new firebase database instance. Get a config object like this one: 

```js
export const firebaseConfig = {
  apiKey: '...',
  authDomain: '...',
  databaseURL: '...',
  projectId: '..',
  storageBucket: '',
  messagingSenderId: '...'
};
```

And save it in a file named `firebase.config.ts` inside `./src/environments/`

### Build and serve

Webpack has been ejected from the app to enable the node `crypto` package, so build the app using:

```
npm run start
```

And open a tab in your browser: `localhost:4200`

### Editing the wallet styles

Additionally you edit the wallet styles by editing the `.scss` files inside `./src/assets/sass/app/*` 

A `gulpfile.js` has been configured in order to compile the files into their corresponding components. 

Open a new tab in your terminal and run: 

```
cd orocolo-wallet; gulp watch
```

To watch for changes.

Note: Global styles are compiled into a `global.component.css` file and the app global styles are served from `styles.css`

## Running in hosted development mode

Edit the `./src/environments/environment.ts` file: 

```
export const environment = {
  production: true,
  development: true,
  local: false,
};
```

This mode allows you to work with a deployed build in a remote server. 

### Building the app for deployment

```
npm run build
```

Look for the compiled project in the `./dist` directory. 

Later, you can deploy or upload your project to the desired destination. I used: 

```
 scp -P 2222 -r ./dist/. username@IP:/path/to/server/directory
```

But you can use any deployment tool













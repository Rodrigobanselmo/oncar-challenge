## Getting Started

First, if you want to run the API locally, go to the main-server branch on this project and follow the steps their to put the server online and then change3 in '/src/services/api.ts' to http://localhost:3333.

Then clone this branch with

```bash
git clone -b main-client --single-branch git@github.com:Rodrigobanselmo/oncar-challenge.git
```

Finally run:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## LIVE DEMO

[`Click here to see the aplication`](https://oncar-client.vercel.app/).

deployed at https://oncar-client.vercel.app/

![Alt images](public/images/model2.png?raw=true "Title")

![Alt images](public/images/model1.png?raw=true "Title")

## Testing Library & Jest

```bash
npm run test
# or
yarn test
```

![Alt images](public/images/unit_test.png?raw=true "Title")

## Cypress

```bash
npm run cy
# or
yarn cy
```

![Alt images](public/images/cypress_test.png?raw=true "Title")

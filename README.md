# BigCommerce / Next.js Starter

This starter is built to showcase a mix of editorial and e-commerce, taking advantage of page-building components, BigCommerce data integration, and internationalization tooling.

[image here later]

## BigCommerce

[BigCommerce](https://bigcommerce.com) BigCommerce is a leading software-as-a-service (SaaS) ecommerce platform that empowers merchants of all sizes to build, innovate and grow their businesses online. As a leading open SaaS solution, BigCommerce provides merchants sophisticated enterprise-grade functionality, customization and performance with simplicity and ease-of-use.

## Table of contents

- [Features](#features)
- [Getting started](#getting-started)
- [Importing Data](#importing-data)
- [Internationalization](#internationalization)
- [Contributing](#contributing)
- [License](#license) 

## Features

- Styled with [Sanity UI](https://sanity.io/ui), an ergonomic React library for quickly building and prototyping accessible web apps.
- Cart powered by [BigCommerce](https://bigcommerce.com) merchant APIs.
- BigCommerce products in the studio, and a script to pull just the data you need from BigCommerce's GraphQL endpoint.
- Rich content building in articles, product detail pages, and campaign pages in the Sanity Studio.
- I18n support.
- Vercel deployment.

## Getting started

The quickest way to get up and running is to go to https://www.sanity.io/create?template=sanity-template-bigcommerce-editorial and create a new project by following the instructions on Sanity.

You can also clone this repo and do some configuration locally -- we'll guide you through the steps on importing your data!

### Installation guide

1. Clone this repository ([learn how to do this](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository)).

2. Be sure you have Sanity installed! Run `npm install -g @sanity/cli` if you don't.

3. If you came from the one-click starter, add your own `projectTitle`, `projectId,` and `dataset` in `/studio/sanity.json`. You can also find these on [manage.sanity.io](https://manage.sanity.io). If you're starting from cloning to this repo, run `sanity init` in that `/studio` folder.

4. Ensure your studio is ready to run locally.

```bash
npm install && cd /studio && sanity install
```

5. Get setup with BigCommerce. If you don't have an account, start one. Then go to Advanced Settings/API Accounts. I'd recommend 2 separate, specific tokens, since you'll be interfacing with the API in two different, potentially sensitive ways. One should have a 'Cart' scope and the other should have Storefront API Tokens and Products scope. For the rest of this readme I'll refer to them as 'cart token' and 'import token'.

6. Populate your environment variables. There is an env.example file in the main folder, and another in the Sanity studio. Rename them to `.env.development`. Here's some tips on filling out the main file:
```
SANITY_API_TOKEN={if you don't have one, set one up on manage.sanity.io}
SANITY_STUDIO_API_DATASET={this came from the last step -- you usually want 'production'}
SANITY_STUDIO_API_PROJECT_ID={also came from the last step -- yuo can always find this on manage.sanity.io}
BIGCOMMERCE_API_TOKEN={cart token}
BIGCOMMERCE_API_URL={usually like https://api.bigcommerce.com/stores/{your store hash}/v3}
```

Here are the guidelines for the  studio `.env.development` file:

```
SANITY_STUDIO_BIGCOMMERCE_STORE_HASH={you can find this anywhere you're logged into your BigCommerce account -- for example, if the URL in my browser is https://store-rix57ghiz3.mybigcommerce.com/manage/dashboard, "rix57ghiz3" is the value I should put here}
SANITY_STUDIO_BIGCOMMERCE_STORE_API_TOKEN={this is the import token you made in the last step}
```

5. Be sure you have `concurrently` installed (`npm install -g concurrently`). Run the command below to start the development server:

```bash
npm run dev
```

This will run the frontend at `localhost:3000` and studio at `localhost:3333`.

## Importing data

1. If you set up from the Sanity starters page, you don't need to import the base data. If you started by cloning this repo, then extract the `production.tar.gz` file in `/data` directory with:

```bash
tar -xf production.tar.gz
```

This will provide you with a folder like `production-export-xxx`.  Then go to your /studio folder and run `sanity dataset import {production-export-xxxfolder}/data.ndjson`


2. Now that your keys and base data are all set, you can import data from BigCommerce! Go to your studio folder and run `sanity exec src/bigCommerceSync`. If you receive undefined errors for any of the environment variables, try setting your sanity env with `export SANITY_ACTIVE_ENV=development` from the command line.

## Internationalization

I18n is currently only available on product pages, as a guideline. Set the "override" fields in products in Sanity and use Next.js routing (e.g., 'localhost:3000/fr/shop/product-slug' to see the French version of a product. 

## License

This repository is published under the [MIT](LICENSE) license.


# plib

![docs/plib.png](docs/plib.png)

Host a webapp to access your S3 files using Cognito credentials. 

## Stack

- React.js
- CloudFlare functions

## Requirements

- AWS Cognito User / Identity Pool
- AWS S3
  - Necessary IAM Policies: List, Get
- CloudFlare account

## Deployment

- Deploy using [CloudFlare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-anything)

## Development

- configure `.dev.vars` for CloudFlare Functions
  - Look through `functions/` for required env vars
  - You will need: Congito Userpool ID, Cognito Client ID, Congnito Identitypool ID, S3 Bucket name, and AWS region.
- `npm i && npm run build` to setup project
- `npm run pages` to run webapp in development mode

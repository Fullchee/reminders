# Reminders

All the important code is in `src/start.js`.

```
yarn install
yarn run build
yarn start
```

For Local Development

1. You need to start Mongodb for Local development
2. Run this

```
npm run startdev
```

# [Values backend](https://fullchee-values-backend.herokuapp.com/)

## Links

- Backend GraphQL Server
  - [Website](https://fullchee-values-backend.herokuapp.com/)
  - [GitHub](https://github.com/Fullchee/values-backend)
- Frontend React App
  - [Website](https://fullchee-values.netlify.com/)
  - [GitHub](https://github.com/Fullchee/values-client)

## Tech

- powered by [graphql-yoga](https://github.com/prisma-labs/graphql-yoga)
  - Node.js & Express
    - Resolvers programmed in src/resolvers.js
      - data: plain JS objects
- [data reset function](https://fullchee-values-backend.herokuapp.com/reset)
  - password protected (stored in Heroku config)
    - (git-crypt didn't work well with Heroku)
  - passwords encrypted with bcrypt
- Easy script to update links from the production server
  - `yarn updateLinks`

## Install

### Prerequisites

- yarn
- Node.js

```bash
yarn install
yarn start
```

## Lessons learned

- Encrypting the reset password
  - used bcrypt and a Heroku config variable
  - I couldn't figure out how to use git-crypt with Heroku
- keywords generation
  - keywords.txt -> JSON
  - txt: easy to add/remove words
  - I initially put it in client
  - logically made sense to put it in the back-end, make it available via /keywords
- updateLink
  - mutation params can only be simple (no Link param)
    - I used a stringified object => way easier to create queries

## TODOs

- Create a Postgres table
- prevent closing
  - or save when closing?
- Ajahn Brahm: Dealing with addictions
  - Doctor, there's something right with me, I'm sick again
- Idea of romance: srivasti abbey
- the times are a changing, radio lab, days used to be 6 hours, the moon used to be 10x bigger than it is now
- Close enough: hidden brain
- Automated tests with Newman
  - automate tests for adding all the user behaviours
  - stub the backend?
  - automated tests with the real backend
- add Anna Akana and In a Nutshell to values
- handle bugs
- related videos?
- Play a random reminder in a certain category
  - eg: mindfulness talk -> like daily calm
- search through description

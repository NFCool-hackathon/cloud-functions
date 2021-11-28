# BetFight CloudFunctions

# Pre-reqs

- Node v14
- [Firebase CLI](https://firebase.google.com/docs/cli)
    - `firebase login`

# Getting started

- Install dependencies

```
cd functions
npm install
```

- Connect your account to Firebase

```
firebase login
```

- Create a project on [twilio.com](https://twilio.com) 

Twilio verify API documentation [here](https://www.twilio.com/docs/verify/api)
- Create the file `functions/.env.ts` with the following information:
```
export const twilioSid = // Your Twilio SID;
export const twilioAuthToken = // Your twilio Auth Token;
export const serviceSid = // Your Twilio Verify API Service SID;
export const serverKey = // Key that you choose to secure connexion from the unit minter app;
```

# Deploying functions

- To deploy a function by this name

```
firebase deploy --only functions:<name>
```

- To deploy all functions

```
firebase deploy --only functions
```

# Firebase env

- To update firebase env configuration

```
firebase deploy --only functions:set <key>:<value>
```

- To get firebase env configuration

```
firebase deploy --only functions:get <key>
```

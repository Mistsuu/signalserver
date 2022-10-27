# signalserver

A project made for the submission of my undergraduate thesis, aiming to create a server for a chat application *(link: https://github.com/Mistsuu/signalchat)* that applies my homemade library implementing the Signal Protocol *(link: https://github.com/Mistsuu/native-rachet)*. This work is the result of following the documents of Moxie Marlinspike and Trevor Perrin *(link: https://signal.org/docs/)*. 

However, since the resulting application does not support **per-user identity key mode** to provide an in-person authentication method, it is still susceptible to the man-in-the-middle attack performed by the server.

This project is made for educational uses only.

## Requirements

This application has only been verified to be used in the environment of **Ubuntu 20.04** only. It uses **NodeJS** as the backbone, with **MongoDB** for the database storing users' data.

- Node version: `16.14.0`

## How to run

1. First, you need to clone the repository and install Node packages:

   ```bash
   git clone https://github.com/Mistsuu/signalserver
   cd signalserver
   yarn install
   ```

2. Start the application:

   ```bash
   yarn start
   ```

## Note

In order to change the port of the server, set the variable `PORT` manually at `app/consts/app.const.js` .

In order to change the URL of the database, set the variable `DB_URL` manually at `app/consts/db.const.js`

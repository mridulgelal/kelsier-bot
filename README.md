# Discord Bot to make you smile

Kelsier is a  Discord bot built using discord.js that provides a variety of fun commands, including creating a short URL, fetching weather information, motivational quotes, jokes, and advice—all powered by free third-party APIs.

## Features

- **/create** - Creates a new short URL.
- **/weather** - Gets the current weather for a specified city.
- **/quote** - Returns a random motivational quote.
- **/joke** - Fetches a random joke.
- **/advice** - Provides a random piece of advice.

## Dependencies

- [discord.js](https://discord.js.org/) v14.18.0
- [dotenv](https://www.npmjs.com/package/dotenv) v16.4.7
- [node-fetch](https://www.npmjs.com/package/node-fetch) v2.7.0
- [nodemon](https://nodemon.io/) v3.1.9 (for development)

## Setup and Installation

# .env
TOKEN=your_discord_bot_token
CLIENT_ID=your_discord_application_client_id
OPENWEATHER_API_KEY=your_openweather_api_key

```bash
git clone https://github.com/mridulgelal/kelsier-bot
cd kelsier-bot
npm install


```bash
node commands.js

```bash
npm start

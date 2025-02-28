require("dotenv").config();
const fetch = require("node-fetch");
const { Client, Events, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith("create")) {
    const url = message.content.split("create")[1];
    return message.reply({ content: "Generating Short ID for " + url });
  }

  message.reply({ content: "Hi from kelsier" });

  console.log(message.content);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (commandName === "weather") {
    // Weather command
    const city = interaction.options.getString("city");
    try {
      const apiKey = process.env.OPENWEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const response = await fetch(url);
      console.log("🚀 ~ file: index.js:47 ~ response:", response);

      if (!response.ok) {
        await interaction.reply("Could not find weather data for that city.");
        return;
      }

      const data = await response.json();
      const description = data.weather[0].description;
      const temp = data.main.temp;

      await interaction.reply(
        `Weather in **${city}**: ${description}, ${temp}°C`
      );
    } catch (error) {
      console.error(error);
      await interaction.reply("An error occurred while fetching the weather.");
    }
  } else if (commandName === "quote") {
    // Motivational Quote command
    try {
      const response = await fetch("https://zenquotes.io/api/random");
      const data = await response.json();
      const quote = data[0].q;
      const author = data[0].a;
      await interaction.reply(`"${quote}" — **${author}**`);
    } catch (error) {
      console.error(error);
      await interaction.reply("Error fetching a quote.");
    }
  }
  //    if (commandName === "pickup") {
  //     // Pickup Lines command
  //     try {
  //       // Example uses a raw GitHub JSON file
  //       const response = await fetch(
  //         "https://raw.githubusercontent.com/NikhilDev2002/Pickup-Lines-API/main/pickuplines.json"
  //       );
  //       const data = await response.json();
  //       const randomIndex = Math.floor(Math.random() * data.length);
  //       const line = data[randomIndex];
  //       await interaction.reply(line);
  //     } catch (error) {
  //       console.error(error);
  //       await interaction.reply("Error fetching a pickup line.");
  //     }
  //   }
  else if (commandName === "joke") {
    // Joke command
    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );
      const data = await response.json();
      await interaction.reply(`${data.setup}\n\n${data.punchline}`);
    } catch (error) {
      console.error(error);
      await interaction.reply("Error fetching a joke.");
    }
  } else if (commandName === "advice") {
    // Advice command
    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      const data = await response.json();
      await interaction.reply(data.slip.advice);
    } catch (error) {
      console.error(error);
      await interaction.reply("Error fetching advice.");
    }
  }
});

client.login(process.env.TOKEN);

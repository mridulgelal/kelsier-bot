require("dotenv").config();
const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: "create",
    description: "Creates a new short Url",
  },
  {
    name: "weather",
    description: "Get the current weather for a city",
    options: [
      {
        name: "city",
        type: 3, // STRING
        description: "City name to get the weather for",
        required: true,
      },
    ],
  },
  {
    name: "quote",
    description: "Get a random motivational quote",
  },
  // {
  //   name: "pickup",
  //   description: "Get a random pickup line",
  // },
  {
    name: "joke",
    description: "Get a random joke",
  },
  {
    name: "advice",
    description: "Get a random piece of advice",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands...");

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();

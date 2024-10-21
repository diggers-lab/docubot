import { EntryPoint } from "@entrypoint/entryPoint.abstract";
import { CliHandler } from "@handler/cli.handler";
import * as fs from "node:fs";
import * as path from "node:path";

export class InitScript extends EntryPoint {
  cliHandler: CliHandler = new CliHandler();
  main(): number {
    try {
      this.asyncRun().then((r) => r);
      return 0;
    } catch (error) {
      console.error("An error occurred:\n", error);
      return -1;
    }
  }

  async asyncRun(): Promise<void> {
    let config;
    try {
      console.log(`${process.cwd()}/./config/docubot.config.json`);
      config = await import(`${process.cwd()}/./config/docubot.config.json`);
    } catch (error) {
      console.log(
        `config file at ${process.cwd()}/./config/docubot.config.json bot found, entering CLI mode`,
      );
    }
    if (!config) {
      let configPath = await this.askConfigPath();
      if (configPath === "") {
      }
      console.log("toto :><", `${path.join(process.cwd(), configPath)}`);
      config = fs.readFileSync(
        `${path.join(process.cwd(), configPath)}`,
        "utf-8",
      );
      console.log("config :>> ", config);
    }
    await this.end();
  }

  async askConfigPath(): Promise<void> {
    return await this.cliHandler.askQuestion(
      "relative path to the config file (enter to create at './config/docubot.config.json'): ",
    );
  }

  async getTsConfigPath(): Promise<void> {
    const tsConfigPath = await this.cliHandler.askQuestion(
      "What's the path to the tsconfig file? ",
    );
    console.log(`The path to the tsconfig file is: ${tsConfigPath}`);
  }

  async end(): Promise<void> {
    this.cliHandler.close();
  }

  init(): void {}
}
/*
import * as readline from "node:readline";
import * as process from "node:process";
import { askQuestion, CliHandler } from "@handler/cli.handler";

// Main function to handle CLI interaction
const main = async () => {
  try {
    console.log("Welcome to the CLI!");

    // Ask for user name
    const name = await askQuestion("What's your name? ");
    console.log(`Hello, ${name}!`);

    // Ask for age
    const age = await askQuestion("How old are you? ");
    console.log(`You are ${age} years old!`);

    // Ask if the user wants to continue
    const shouldContinue = await askQuestion(
      "Do you want to continue? (yes/no) ",
    );
    if (shouldContinue.toLowerCase() !== "yes") {
      console.log("Goodbye!");
      rl.close(); // Close the readline interface
      return;
    }

    console.log("Let's continue the interaction...");

    // Add more interactions as needed
    // ...
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    rl.close(); // Ensure readline is closed even on error
  }
};
*/

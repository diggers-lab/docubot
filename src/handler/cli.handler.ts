// Create an interface for CLI input/output
import readline from "node:readline";
import process from "node:process";

export class CliHandler {
  private readonly rl;
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  public close(): void {
    this.rl.close();
  }

  askQuestion = (query: string): Promise<string> => {
    return new Promise((resolve) => this.rl.question(query, resolve));
  };
  answerQuestion = (answer: string): void => {
    console.log(answer);
  };
}

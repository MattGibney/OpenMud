export interface Config {
  /**
   * Port number the telnet server will listen on.
   */
  telnetPort: number;

  passwordHashingSaltRounds: number;
}

const environment: Config = {
  telnetPort: 3200,
  passwordHashingSaltRounds: 10,
};

export default environment;

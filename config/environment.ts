export interface Config {
  /**
   * Port number the telnet server will listen on.
   */
  telnetPort: number;
}

const environment: Config = {
  telnetPort: 3200,
};

export default environment;

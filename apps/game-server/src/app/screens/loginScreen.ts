import * as pino from 'pino';
import ConnectionModel from '../models/connectionModel';
import BaseScreen from './baseScreen';

interface ScreenPage {
  id: string;

  /**
   * This message is rendered to the player when the screen switches to this
   * page.
   */
  initialText: string;
  inputType: 'CHOICE' | 'FREETEXT';
  inputOptions?: string[];
  inputHandler: (data: string, screen: LoginScreen) => void;
}

const ScreenPages: ScreenPage[] = [
  {
    id: 'welcome',
    initialText: '\n\nWelcome to the game\n\n',
    inputType: 'CHOICE',
    inputOptions: ['Login'],
    inputHandler(data: string, screen: LoginScreen) {
      if (
        this.inputOptions &&
        !this.inputOptions
          .map((option) => option.toLocaleLowerCase())
          .includes(data.toLowerCase())
      ) {
        screen.connectionInstance.sendMessage('Input not recognised');
        screen.renderInputPrompt();
        return;
      }
      if (data === 'login') {
        screen.setScreenPage('input-username');
      }
    },
  },
  {
    id: 'input-username',
    initialText: '\nUsername:',
    inputType: 'FREETEXT',
    inputHandler(data: string, screen: LoginScreen) {
      screen.username = data;
      screen.setScreenPage('input-password');
    },
  },
  {
    id: 'input-password',
    initialText: '\nPassword:',
    inputType: 'FREETEXT',
    async inputHandler(data: string, screen: LoginScreen) {
      const username = screen.username;
      const password = data;

      const didLogin = await screen.connectionInstance.authenticatePlayer(
        username,
        password
      );
      if (!didLogin) {
        screen.connectionInstance.sendMessage('Incorrect Username or password');

        screen.username = '';
        screen.setScreenPage('input-username');
        return;
      }

      screen.connectionInstance.sendMessage('LOGGED IN!!');
      screen.connectionInstance.switchScreenToAdventure();
    },
  },
];

export default class LoginScreen extends BaseScreen {
  private screenPage!: ScreenPage;
  public username: string;

  constructor(connectionModel: ConnectionModel, logger: pino.Logger) {
    super(connectionModel, logger);
    this.setScreenPage('welcome');

    this.username = '';
  }

  get connectionInstance(): ConnectionModel {
    return this.connection;
  }

  inputHandler(data: string): void {
    this.screenPage.inputHandler(data, this);
  }

  renderInputPrompt(): void {
    if (this.screenPage.inputType === 'CHOICE') {
      return this.connection.sendMessage(
        `[${this.screenPage.inputOptions}]?`,
        false
      );
    }
    if (this.screenPage.inputType === 'FREETEXT') {
      return this.connection.sendMessage('>', false);
    }
  }

  setScreenPage(pageId: string): void {
    const screenPage = ScreenPages.find((page) => page.id === pageId);
    if (!screenPage) throw 'Attempted to switch to a non-existant page';
    this.screenPage = screenPage;

    this.connection.sendMessage(this.screenPage.initialText);
    this.renderInputPrompt();
  }
}

import AdventureScreen from './screens/adventureScreen';
import LoginScreen from './screens/loginScreen';

export default class ScreenFactory {
  public adventure: typeof AdventureScreen;
  public login: typeof LoginScreen;

  constructor() {
    this.adventure = AdventureScreen;
    this.login = LoginScreen;
  }
}

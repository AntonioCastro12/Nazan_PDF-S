import { AppConfig } from './app.config';
import { UserConfig } from './user.config';
import { LayoutConfig } from './layout.config';
import { MenuChangeEvent } from './menu.entity';
import { ThemeConfig } from './theme.config';
import { welcomeMenu } from '../menus/layout-welcome-menu';

export class LayoutState {
  // id: string = '';
  // store_id: string = '';
  // role_value: string = '';
  config: LayoutEntity = new LayoutEntity();
}

export class LayoutEntity {
  appConfig: AppConfig = new AppConfig();
  themeConfig: ThemeConfig = new ThemeConfig();
  layoutConfig: LayoutConfig = new LayoutConfig();
  menuChangeEvent: MenuChangeEvent = new MenuChangeEvent();
  userConfig: UserConfig = new UserConfig();
  menuSelected: Array<any> = welcomeMenu;
}

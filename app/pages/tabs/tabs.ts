import {Page} from 'ionic-angular';
import {StopPage} from '../stop/stop';
import {RouteListPage} from '../route-list/route-list';

@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})

export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = StopPage;
  tab2Root: any = RouteListPage;
}

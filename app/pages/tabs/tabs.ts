import {Component} from '@angular/core';
import {StopPage, RouteListPage} from '../pages';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})

export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = StopPage;
  tab2Root: any = RouteListPage;
}

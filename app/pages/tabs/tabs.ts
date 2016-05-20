import {Page} from 'ionic-angular';
import {SearchBus} from '../search-bus/search-bus';
import {Mapa} from '../mapa/mapa';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = SearchBus;
  tab2Root: any = Mapa;
}

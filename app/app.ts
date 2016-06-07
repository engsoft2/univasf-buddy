import {ViewChild} from '@angular/core';
import {App, Nav, Platform, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {NewsListPage, TabsPage, RouteDetailsPage} from './pages/pages';
import {RouteService} from './providers/providers';

interface PageObj {
  title: string;
  component: any;
  icon: string;
  index?: number;
}

@App({
  // template: '<ion-nav [root]="rootPage"></ion-nav>',
  templateUrl: 'build/app.html',
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
  providers: [RouteService]
})

export class MyApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  appPages: PageObj[] = [
    { title:    'Noticias', component: NewsListPage, index: 0, icon: 'megaphone' },
    { title: 'Cardápio RU', component: RouteDetailsPage, index: 1, icon: 'restaurant' },
    { title:       'Busão', component: TabsPage, index: 2, icon: 'bus' },
    { title:       'Sobre', component: TabsPage, index: 3, icon: 'information-circle' },
  ];
  rootPage: any = TabsPage;

  constructor(private platform: Platform, private menu: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page: PageObj) {
    // if page is the same do nothing
    if (this.nav.root == page.component) {
      return;
    }
    // navigate to the new page if it is not the current page
    this.rootPage = page.component;
  }
}

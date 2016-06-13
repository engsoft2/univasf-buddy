import {Component, ViewChild, } from '@angular/core';
import {Nav, Platform, MenuController, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {NewsListPage, TabsPage, RouteDetailsPage,
  RuListPage, HomePage, AboutPage} from './pages/pages';
import {RouteService} from './providers/providers';

interface PageObj {
  title: string;
  component: any;
  icon: string;
  index?: number;
}

@Component({
  templateUrl: 'build/app.html'
})

export class MyApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  appPages: PageObj[] = [
    { title: 'Início', component: HomePage, index: 0, icon: 'home' },
    { title: 'Notícias', component: NewsListPage, index: 1, icon: 'megaphone' },
    { title: 'Cardápio RU', component: RuListPage, index: 2, icon: 'restaurant' },
    { title: 'Busão', component: TabsPage, index: 3, icon: 'bus' },
    { title: 'Sobre', component: AboutPage, index: 4, icon: 'information-circle' },
  ];
  rootPage: any = HomePage;

  constructor(private platform: Platform, private menu: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleBlackTranslucent();
      StatusBar.backgroundColorByHexString("#1976D2");
      // window.analytics.startTrackerWithId("UA-78952500-1");
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

// Pass the main app component as the first argument
// Pass any providers for your app in the second argument
// Set any config for your app as the third argument:
// http://ionicframework.com/docs/v2/api/config/Config/
ionicBootstrap(MyApp, [RouteService], {});

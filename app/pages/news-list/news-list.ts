import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {NewsDetailsPage} from '../pages';
import {RouteService} from '../../providers/providers';
import {TimeAgoPipe}  from 'angular2-moment';

@Component({
  templateUrl: 'build/pages/news-list/news-list.html',
  pipes: [TimeAgoPipe]
})

export class NewsListPage {
  private news: any[];
  // start from second page
  private pageCountControll = 2;

  constructor(public nav: NavController, public service: RouteService) {
      // window.analytics.trackView("News Page");
  }

  ngOnInit() {
    this.service.getnewsHeadlines(1).then(data => {
      this.news = <Array<any>>data;
      console.log(this.news);
    });
  }

  getDate(news: string): Date {
    // news is something like this: [253 acessos]02-06-2016 10:27:06 -

    // date = 02-06-2016 10:27:06
    let date = news.split(']')[1].substr(0,19);

    let day = date.substr(0,2);
    let month = date.substring(3,5);

    date = date.substring(5,19);
    date = month.concat('-', day, date);

    return new Date(date);
  }

  goToNewsDetails(code, title, date) {
    // news is something like this: "window.open('detalhe_noticias.php?cod=3338','_self')"
    // we want the number 3338 form the string above
    // TODO: improve this code
    let cod = code.split('=')[1].split(',')[0].split("'")[0];
    date = this.getDate(date);
    this.nav.push(NewsDetailsPage, {title: title, cod: cod, date: date});
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    this.service.getnewsHeadlines(1).then(data => {
      this.news = <Array<any>>data;
      console.log(this.news);
      refresher.complete();
    });

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  doInfinite(infiniteScroll) {
    console.log('start async call');

    // limit of pages is 192
    if (this.pageCountControll == 192 + 1) return;

    this.service.getnewsHeadlines(this.pageCountControll++).then(data => {
      this.news = this.news.concat(data);
      // console.log(this.news);
      infiniteScroll.complete();
    });

    setTimeout(() => {
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }
}

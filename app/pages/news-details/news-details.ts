import {Page, NavController, NavParams} from 'ionic-angular';
import {RouteService} from '../../providers/providers';
import {CalendarPipe} from 'angular2-moment';

@Page({
  templateUrl: 'build/pages/news-details/news-details.html',
  pipes: [CalendarPipe],
})

export class NewsDetailsPage {
  news: any;
  title: any;
  date: any;

  constructor(public nav: NavController, public params: NavParams, public service: RouteService) {
    console.log(params.data);
    this.title = params.data.title;
    this.date = params.data.date;
  }

  ngOnInit() {
    this.service.getNews(this.params.data.cod).then(data => {
      this.news = data;
      console.log(data);
    });
  }
}

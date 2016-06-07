import {Page, NavController, NavParams} from 'ionic-angular';
import {RouteService} from '../../providers/providers';
import {CalendarPipe} from 'angular2-moment';

@Page({
  templateUrl: 'build/pages/news-details/news-details.html',
  pipes: [CalendarPipe],
})

export class NewsDetailsPage {
  private news:  any;
  private title: string;
  private date:  Date;

  constructor(public nav: NavController, public params: NavParams, public service: RouteService) {
    this.title = params.data.title;
    this.date = params.data.date;
  }

  ngOnInit() {
    this.service.getNews(this.params.data.cod).then(data => {
      this.news = data;
    });
  }
}

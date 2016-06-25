import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {RouteService} from '../../providers/providers';
import {CalendarPipe} from 'angular2-moment';

@Component({
  templateUrl: 'build/pages/news-details/news-details.html',
  pipes: [CalendarPipe],
})

export class NewsDetailsPage {
  private news: any;
  private title: string;
  private date: Date;
  private cod: string;

  constructor(public params: NavParams, public service: RouteService) {
    this.title = params.data.title;
    this.date = params.data.date;
    this.cod = params.data.cod;
  }

  ngOnInit() {
    this.service.getNews(this.params.data.cod).then(data => {
      this.news = data;
    });
  }
}

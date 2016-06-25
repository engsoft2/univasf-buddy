import {Component, ViewChild} from '@angular/core';
import {Content} from 'ionic-angular';
import {RouteService} from '../../providers/providers';
import {CalendarPipe} from 'angular2-moment';

@Component({
  templateUrl: 'build/pages/ru-list/ru-list.html',
  pipes: [CalendarPipe]
})

export class RuListPage {
  @ViewChild(Content) content: Content;

  private meals: any;
  constructor(private service: RouteService) { }

  ngOnInit() {
    this.service.getRU()
      .subscribe(data => {
        this.meals = data;
        this.scrollTo();
      });
  }

  scrollTo() {
    // set the scrollLeft to 0px, and scrollTop to 500px
    // the scroll duration should take 200ms
    this.content.scrollTo(0, 2*442, 1000);
  }

  getDate(date): Date {
    return new Date(date + " 14:00:00");
  }

}

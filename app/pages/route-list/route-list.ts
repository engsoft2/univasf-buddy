import {Loading, Page, NavController} from 'ionic-angular';
import {RouteCard}    from '../../components/components';
import {RouteModel}   from '../../models/models';
import {RouteService} from '../../providers/providers';

// type of filter
enum FilterType { TODOS, CIRCULANDO, ACIRCULAR }

@Page({
  templateUrl: 'build/pages/route-list/route-list.html',
  directives: [RouteCard],
})

export class RouteListPage {
  private searchQuery: string = '';
  private routes: Array<RouteModel>;
  private backup: Array<RouteModel>;
  private filter: Array<string>;
  private buses = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  private _filterBy: FilterType;

  // get reference to type of Filters Enum
  FilterType = FilterType;

  constructor(public nav: NavController, public routeData: RouteService) {
    this._filterBy = FilterType.TODOS;
    this.filter = this.buses;
  }

  ngOnInit() {
    this.initializeItems();
  }

  initializeItems() {
    this.routeData.routes.then(
      data => {
        this.routes = data;
        this.backup = data;
      }
    );
  }

  private filterByBus(isToFilter?: boolean) {
    // Reset items back to all of the items
    this.routes = this.backup;

    // get buses selected in the UI
    let q = this.filter;

    // save check
    if (this.routes) {
      this.routes = this.routes.filter((v) => {
        // little hack b/c there is one case where v.bus = C/D
        if (v.bus.length > 1) {
          return q.indexOf(v.bus[0]) > -1 || q.indexOf(v.bus[2]) > -1;
        }
        return q.indexOf(v.bus) > -1;
      });
    }

    if (this._filterBy != FilterType.TODOS && isToFilter) {
      this._filterBy == FilterType.CIRCULANDO ?
        this.filterBy(FilterType.CIRCULANDO) :
        this.filterBy(FilterType.ACIRCULAR);
    }
  }

  private filterBy(filter: FilterType) {
    // save check
    if (!this.routes) return;

    // first filter by bus
    this.filterByBus();

    // update UI - button that represent the filter changes its background color
    this._filterBy = filter;

    switch (filter) {
      case FilterType.CIRCULANDO:
        this.routes = this.routes.filter(v => {
          // Um onibus esta circulando quando o horario da primeira parada
          // ja passou e o da ultima ainda nao.
          return v.first.time <= Date.now() && v.last.time >= Date.now();
        });
        break;
      case FilterType.ACIRCULAR:
        this.routes = this.routes.filter(v => {
          // um onibus vai circular quando o horario da primeira parada
          // ainda nao passou
          return v.first.time > Date.now();
        });
        break;
    }
  }
}

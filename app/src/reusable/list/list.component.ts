import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { ListItemComponent } from '../list-item/list-item.component';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  catchError,
  map,
  of,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, SearchComponent, ListItemComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent<T> implements OnChanges, OnInit, OnDestroy {
  @ContentChild('listItem') listItem: TemplateRef<unknown> | undefined;
  @ContentChild('noItems') noItems: TemplateRef<unknown> | undefined;
  @ContentChild('loading') loadingTemplate: TemplateRef<unknown> | undefined;
  @ContentChild('search') searchBar: TemplateRef<unknown> | undefined;
  @ContentChild('listFooter') footer: TemplateRef<unknown> | undefined;
  @ContentChild('listHeader') header: TemplateRef<unknown> | undefined;

  private subscription = new Subscription();
  private _itemsSubject$ = new BehaviorSubject<T[]>([]);

  //TODO maybe make @Input for extend functionallity to parent component
  private filterValue = '';

  items$ = this._itemsSubject$.asObservable().pipe(
    map((items) => this.filterPipe(items)),
    catchError((err) => {
      console.log(`Error ocurred on ListComponent ${err}`);
      return of([]);
    })
  );
  showNoItemsTemplate = true;

  @Input() labelValue = 'name';
  @Input() title = 'Manage';
  @Input() searchTerm = '';
  @Input() placeholder = 'Search';
  @Input() notFoundMessage = 'No items found...';
  // if true use the filter functionallity from this component
  @Input() filterable = true;

  // TODO infinity scroll functionallity to avoid performance issues to many nodes rendered at the same time
  @Input() infinityScroll = true;
  @Input() items: Array<T> | Observable<Array<T>> | undefined | null;
  @Input() isLoading!: boolean;

  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      const currentItems = changes['items'].currentValue;
      if (Array.isArray(currentItems)) {
        this._itemsSubject$.next(currentItems);
      } else if (currentItems instanceof Observable) {
        //TODO check this logic because probably need to unsubscribe when input change reference
        currentItems
          .pipe(
            tap((data: T[]) => {
              this._itemsSubject$.next(data);
            })
          )
          .subscribe();
      }
    }
  }

  ngOnInit(): void {
    this.subscription.add(
      this.items$.subscribe((items) => {
        this.showNoItemsTemplate = !items.length;
      })
    );
  }

  onSearch(searchTerm: string): void {
    this.search.emit(searchTerm);
    if (this.filterable) {
      this.filter(searchTerm);
    }
  }

  //TODO maybe create a custom pipe for this or change to more apropiate name
  filterPipe(items: T[]): T[] {
    return this.filterable
      ? items.filter((item) => this.matchFilter(item, this.filterValue))
      : items;
  }

  // TODO maybe improve this filter logic is just like that for example usage
  matchFilter(item: T, filterValue: string): boolean {
    if (item instanceof Object) {
      const values = Object.values(item);
      return values.join('').toLocaleLowerCase().includes(filterValue);
    }
    return false;
  }

  filter(searchTerm: string): void {
    const normalizedTerm = searchTerm
      .toString()
      .replace(/\s/g, '')
      .toLowerCase();

    this.filterValue = normalizedTerm;
    this._itemsSubject$.next(this._itemsSubject$.getValue());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

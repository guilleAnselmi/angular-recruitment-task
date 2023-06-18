import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
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
import { ListItem, listApi } from './listApi';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, SearchComponent, ListItemComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent<T> implements OnChanges, OnDestroy {
  @ContentChild('listItem') listItem: TemplateRef<unknown> | undefined;
  @ContentChild('noItems') noItems: TemplateRef<unknown> | undefined;
  @ContentChild('loading') loadingTemplate: TemplateRef<unknown> | undefined;
  @ContentChild('search') searchBar: TemplateRef<unknown> | undefined;
  @ContentChild('listFooter') footer: TemplateRef<unknown> | undefined;
  @ContentChild('listHeader') header: TemplateRef<unknown> | undefined;
  @ViewChild('content') content!: ElementRef;

  private subscription = new Subscription();

  selectAll = false;
  showNoItemsTemplate = true;

  @Input() labelValue = 'name';
  @Input() title = 'Manage';
  @Input() searchTerm = '';
  @Input() placeholder = 'Search';
  @Input() notFoundMessage = 'No items found...';
  @Input() showSelectAll = false;
  @Input() items: Array<T> | Observable<Array<T>> | undefined | null;
  @Input() isLoading!: boolean;

  @Output() selection: EventEmitter<Array<T>> = new EventEmitter<Array<T>>();
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      const currentItems = changes['items'].currentValue;
      if (Array.isArray(currentItems)) {
        this.listApi.setDataSource(currentItems);
      } else if (currentItems instanceof Observable) {
        //TODO check this logic because probably need to unsubscribe when input change reference
        currentItems
          .pipe(
            tap((data: T[]) => {
              this.listApi.setDataSource(data);
            })
          )
          .subscribe();
      }
    }
  }
  listApi!: listApi<T>;

  constructor() {
    this.listApi = new listApi<T>();
  }

  onItemClick(item: ListItem<T>): void {
    this.listApi.setItemSelected(item, !item.selected);
  }

  onSelectAll() {
    this.selectAll = !this.selectAll;
    this.listApi.selectAll(this.selectAll);
  }

  onSearch(searchTerm: string): void {
    const normalizedTerm = searchTerm
      .toString()
      .replace(/\s/g, '')
      .toLowerCase();

    this.listApi.setFilter(normalizedTerm);
    this.listApi.filterChange();
  }

  onContinueClick(): void {
    // exmaple of custom usage of listAPi
    this.selection.emit(this.listApi.getItemsSelected());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  //TODO maybe change this for a smoother scroll behavior
  onScroll() {
    const scroll = this.content.nativeElement;
    const scrollHeight = scroll.scrollHeight;
    const scrollTop = scroll.scrollTop;
    const clientHeight = scroll.clientHeight;

    if (scrollHeight - scrollTop === clientHeight) {
      this.listApi.loadMoreItems();
    }
  }
}

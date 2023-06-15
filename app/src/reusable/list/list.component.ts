import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, SearchComponent, ListItemComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  @ContentChild('listItem') listItem: TemplateRef<unknown> | undefined;
  @ContentChild('search') searchBar: TemplateRef<unknown> | undefined;
  @ContentChild('listFooter') footer: TemplateRef<unknown> | undefined;
  @ContentChild('listHeader') header: TemplateRef<unknown> | undefined;

  @Input() items!: any; //TODO find a type for this
  @Input() labelValue = 'name';
  @Input() trackBy = 'id';
  @Input() title = 'Manage';
  @Input() searchTerm = '';
  @Input() placeholder = 'Search';
  @Input() filterable = true;

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  trackById(index: number, item: any) {
    return item[this.trackBy];
  }

  onSearch(searchTerm: string) {
    this.search.emit(searchTerm);

    if (this.filterable) {
      this.filter(searchTerm);
    }
  }

  filter(filter: string) {
    console.log(filter);
  }
}

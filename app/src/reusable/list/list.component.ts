import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
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
  @Input() items!: any; //TODO
  @Input() labelValue = 'name';
  @Input() trackBy = 'id';
  @Input() title = 'Manage';
  @Input() searchTerm = '';
  @Input() placeholder = 'Search';

  @ContentChild('listItem') listItem: TemplateRef<unknown> | undefined;
  @ContentChild('listFooter') footer: TemplateRef<unknown> | undefined;
  @ContentChild('listHeader') header: TemplateRef<unknown> | undefined;

  trackById(index: number, item: any) {
    return item[this.trackBy];
  }

  onSearch(searchTerm: string) {
    console.log('searchTerm', searchTerm);
  }
}

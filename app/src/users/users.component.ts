import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from 'src/reusable/list/list.component';
import { ListItemComponent } from 'src/reusable/list-item/list-item.component';
import { UserService } from './services/user.service';
import { UserItemComponent } from './user-item/user-item.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ListComponent, ListItemComponent, UserItemComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  userService = inject(UserService);
  users$ = this.userService.getUsersFiltered();
  isLoading$: Observable<boolean> = this.userService.fetchingUsers$;
  usersTitle = 'Manage Users';
  usersPlaceholder = 'Search Users';
  noUsersMessage = 'No Users found...';

  onSearch(searchTerm: string) {
    this.userService.search(searchTerm);
  }
}

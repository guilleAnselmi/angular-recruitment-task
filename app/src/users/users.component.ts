import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from 'src/reusable/list/list.component';
import { ListItemComponent } from 'src/reusable/list-item/list-item.component';
import { UserService } from './services/user.service';
import { UserItemComponent } from './user-item/user-item.component';
import { Observable } from 'rxjs';
import { User } from './models/user.type';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ListComponent, ListItemComponent, UserItemComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  userService: UserService = inject(UserService);
  users$: Observable<User[]> = this.userService.users$;
  isLoading$: Observable<boolean> = this.userService.fetchingUsers$;
  usersTitle = 'Manage Users';
  usersPlaceholder = 'Search Users';
  noUsersMessage = 'No Users found...';
}

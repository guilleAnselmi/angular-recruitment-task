import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/users/models/user.type';
import { Observable, of } from 'rxjs';
import { ListComponent } from 'src/reusable/list/list.component';
import { ListItemComponent } from 'src/reusable/list-item/list-item.component';
import { UserService } from './services/user.service';
import { UserItemComponent } from './user-item/user-item.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ListComponent, ListItemComponent, UserItemComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  userService = inject(UserService);
  users$: Observable<User[]> = of([]);
  usersTitle = 'Manage Users';
  usersPlaceholder = 'Search Users';

  ngOnInit(): void {
    this.users$ = this.userService.getUsersFiltered();
  }

  onSearch(searchTerm: string) {
    this.userService.search(searchTerm);
  }
}

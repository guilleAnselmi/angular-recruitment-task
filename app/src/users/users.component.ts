import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/api.service';
import { User } from 'src/models/user.type';
import { Observable, map, of, take } from 'rxjs';
import { ListComponent } from 'src/reusable/list/list.component';
import { ListItemComponent } from 'src/reusable/list-item/list-item.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ListComponent, ListItemComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  apiService = inject(ApiService);
  users$: Observable<User[]> = of([]);
  usersTitle = 'Manage Users';
  usersLabel = 'firstName';
  usersPlaceholder = 'Search Users';

  ngOnInit(): void {
    this.users$ = this.apiService
      .fetchUsers()
      .pipe(map((val) => val.splice(0, 10)));
  }

  trackById(index: number, user: User): string {
    return user.id;
  }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserItemComponent } from '../user-item/user-item.component';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user.type';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [CommonModule, UserItemComponent],
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserViewComponent implements OnInit {
  user$: Observable<User | undefined> = of(undefined);

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.user$ = this.userService.getById(id);
  }
}

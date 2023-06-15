import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/users/models/user.type';

@Component({
  selector: 'app-user-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent {
  @Input() user!: User;
}

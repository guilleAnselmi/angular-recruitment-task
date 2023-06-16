import { Injectable } from '@angular/core';
import { ApiService } from 'src/api.service';
import { User } from 'src/users/models/user.type';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersSubject$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(
    []
  );
  users$ = this.usersSubject$.asObservable();
  private searchTerm = '';

  constructor(private apiService: ApiService) {
    this.fetchUsers();
  }

  private fetchUsers(): void {
    this.apiService
      .fetchUsers()
      .subscribe((users) => this.usersSubject$.next(users));
  }

  public getUsersFiltered(): Observable<User[]> {
    return this.users$.pipe(
      map((users) => this.filterUsers(users, this.searchTerm))
    );
  }

  private filterUsers(users: User[], term = '') {
    const normalizedTerm = term.toString().replace(/\s/g, '').toLowerCase();

    return users.filter((user) =>
      `${user.firstName}${user.lastName}${user.email}${user.id}`
        .toLocaleLowerCase()
        .includes(normalizedTerm)
    );
  }

  public getById(id: string): Observable<User | undefined> {
    return this.users$.pipe(
      map((users: User[]) => users.find((user) => user.id === id))
    );
  }

  public search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.usersSubject$.next(this.usersSubject$.getValue());
  }
}

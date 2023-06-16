import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { UserService } from './services/user.service';
import { Observable, of } from 'rxjs';
import { User } from './models/user.type';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let mockUsers$: Observable<User[]>;
  let mockFetchingUsers$: Observable<boolean>;

  beforeEach(() => {
    mockFetchingUsers$ = of(false);
    mockUsers$ = of([
      {
        id: '372ed41d-01cb-4962-ad06-1a8042a7f537',
        firstName: 'Lorrin',
        lastName: 'Stenner',
        email: 'lstenner0@google.es',
        avatarUrl: 'http://dummyimage.com/103x103.png/dddddd/000000',
      },
      {
        id: '348afb8f-516e-40f7-9c95-e9bc2ad9ca64',
        firstName: 'Rab',
        lastName: 'Lunk',
        email: 'rlunk1@cpanel.net',
        avatarUrl: null,
      },
    ]);

    TestBed.configureTestingModule({
      imports: [UsersComponent],
      providers: [
        {
          provide: UserService,
          useValue: { users$: mockUsers$, fetchingUsers$: mockFetchingUsers$ },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have correct users$, title, placeholder, and no users message', () => {
    fixture.detectChanges();
    expect(component.users$).toEqual(mockUsers$);
    expect(component.isLoading$).toEqual(mockFetchingUsers$);
    expect(component.usersTitle).toBe('Manage Users');
    expect(component.usersPlaceholder).toBe('Search Users');
    expect(component.noUsersMessage).toBe('No Users found...');
  });
});

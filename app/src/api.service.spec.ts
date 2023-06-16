import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { User } from './users/models/user.type';
import { environment } from './environments/environment';
import { Country } from './countries/models/country.type';
import { Payment } from './payments/models/payment.type';
import { Status } from './payments/models/status.enum';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch users', () => {
    const mockUsers: User[] = [
      {
        id: '1',
        firstName: 'first',
        lastName: 'last',
        email: 'email',
        avatarUrl: '',
      },
    ];

    service.fetchUsers().subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/users`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should fetch countries', () => {
    const mock: Country[] = [
      {
        id: '1',
        name: 'first',
        code: 'last',
        someWeirdServerFieldNameWithCount: 1,
        flag: '',
      },
    ];

    service.fetchCountries().subscribe((countries) => {
      expect(countries).toEqual(mock);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/countries`);
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  it('should fetch payments', () => {
    const mock: Payment[] = [
      {
        id: 'df504a6c-eec7-4f9d-9d55-967f531c4dce',
        status: Status.DECLINED,
        receiver: 'hfauning0',
        internalFieldA: '20240f49-8fcd-4a31-b8b3-c14081b9a66c',
        xYZRandomField: '5028e3a1-966f-45de-830e-f931dba9c79b',
      },
    ];

    service.fetchPayments().subscribe((payments) => {
      expect(payments).toEqual(mock);
    });

    const req = httpMock.expectOne(`${environment.API_URL}/payments`);
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  // Test cases for fetchCountries and fetchPayments can be added similarly
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Country } from '../models/country.type';
import { CountriesService } from '../services/countries.service';
import { CountryViewComponent } from './country-view.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CountryViewComponent', () => {
  let component: CountryViewComponent;
  let fixture: ComponentFixture<CountryViewComponent>;
  let countriesService: CountriesService;
  const mockCountry: Country = {
    id: '1d94a565-23c3-4e36-acdf-8e4af7b0349c',
    name: 'Cameroon',
    flag: 'http://dummyimage.com/50x50.png/dddddd/000000',
    code: 'CM',
    someWeirdServerFieldNameWithCount: 966,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryViewComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { id: 'mock-id' } } },
        },
        CountriesService,
      ],
    }).compileComponents();

    countriesService = TestBed.inject(CountriesService);
    jest.spyOn(countriesService, 'getById').mockReturnValue(of(mockCountry));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryViewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve country data on initialization', (done) => {
    component.ngOnInit();
    expect(countriesService.getById).toHaveBeenCalledWith('mock-id');
    component.country$.subscribe((country) => {
      expect(country).toEqual(mockCountry);
      done();
    });
  });
});

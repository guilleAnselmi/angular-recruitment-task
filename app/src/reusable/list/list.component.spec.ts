import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { Component, TemplateRef } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

// Mock SearchComponent
@Component({ selector: 'app-search', template: '', standalone: true })
class MockSearchComponent {}

// Mock ListItemComponent
@Component({ selector: 'app-list-item', template: '', standalone: true })
class MockListItemComponent {}

describe('ListComponent', () => {
  let component: ListComponent<any>;
  let fixture: ComponentFixture<ListComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListComponent, MockSearchComponent, MockListItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the items correctly when the input is an array', () => {
    const items = ['item1', 'item2'];
    component.items = items;
    component.ngOnChanges({ items: { currentValue: items } } as any);
    expect(component.items$).toBeDefined();
    component.items$.subscribe((result) => {
      expect(result).toEqual(items);
    });
  });

  it('should set the items correctly when the input is an Observable', () => {
    const items = ['item1', 'item2'];
    const observable = of(items);
    component.items = observable;
    component.ngOnChanges({ items: { currentValue: observable } } as any);
    expect(component.items$).toBeDefined();
    component.items$.subscribe((result) => {
      expect(result).toEqual(items);
    });
  });

  it('should emit the search event and call the filter method when onSearch is called', () => {
    const searchTerm = 'search term';
    const spyFilter = jest.spyOn(component, 'filter');
    const emitSpy = jest.spyOn(component.search, 'emit');
    component.onSearch(searchTerm);
    expect(emitSpy).toHaveBeenCalledWith(searchTerm);
    expect(spyFilter).toHaveBeenCalledWith(searchTerm);
  });

  // Add more test cases to cover other methods and behaviors of the component
});

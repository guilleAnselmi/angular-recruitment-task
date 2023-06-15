import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, OnDestroy {
  inputSubject$ = new Subject<string>();
  searchInput$ = this.inputSubject$.asObservable();
  subscription = new Subscription();
  @Input() placeholder = 'Title';
  @Input() debounce = true;
  @Input() debounceTime = 250;
  @Input() searchValue = '';

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    this.subscription.add(
      this.inputSubject$
        .pipe(debounceTime(this.debounceTime))
        .subscribe((val) => {
          this.search.emit(val);
        })
    );
  }
  onInput() {
    this.inputSubject$.next(this.searchValue.trim());
  }

  // prevent Event type search dispatched
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.onInput();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

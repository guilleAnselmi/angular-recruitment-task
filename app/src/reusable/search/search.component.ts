import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  inputSubject$ = new Subject<string>();
  searchInput$ = this.inputSubject$.asObservable();
  @Input() placeholder = 'Title';
  @Input() debounce = true;
  @Input() debounceTime = 200;
  @Input() searchValue = '';

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    this.inputSubject$
      .pipe(debounceTime(this.debounceTime))
      .subscribe((val) => {
        console.log('val', val);

        this.search.emit(val);
      });
  }
  onInput() {
    this.inputSubject$.next(this.searchValue);
  }
}

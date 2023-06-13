import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent implements OnInit {
  term: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  @Input()
  public placeholder: string = '';

  ngOnInit(): void {}

  emitValue(value: string): void {
    this.onValue.emit(value);
  }
}

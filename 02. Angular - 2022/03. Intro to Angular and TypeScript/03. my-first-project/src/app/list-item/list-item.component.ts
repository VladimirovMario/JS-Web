import { Component, EventEmitter, Input, Output, OnInit, OnDestroy,} from '@angular/core';

export interface ICustomEvent {
  test: number;
}

// Each component has its own template
@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})


export class ListItemComponent implements OnInit, OnDestroy {
  // TypeScript
  @Input('currentUser') user!: { firstName: string; lastName: string };
  // You will get this value at some point (showLastName!)
  @Input() showLastName!: boolean;

  @Input() staticString!: string;
  @Input() staticNumber!: number;

  // In order to pass data from child to parent component
  // we need the Output decorator and an Event Emitter
  @Output('myCustomEvent') customEvent = new EventEmitter<ICustomEvent>();

  intervalId: number | undefined;

  constructor() {
    console.log(this.user);
  }

  // Lifecycle Hook called shortly after creation
  ngOnInit() {
    console.log(this.user);
    this.intervalId = setInterval(() => {}, 5000) as unknown as number;
  }

  selectClickHandler($event: MouseEvent) {
    $event.stopPropagation();
    this.customEvent.emit({ test: 123 });
  }
 
  // Lifecycle Hook used for cleanup
  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}

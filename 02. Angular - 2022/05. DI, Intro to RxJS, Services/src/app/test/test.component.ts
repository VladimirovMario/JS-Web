import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  Injector,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { myCustomToken } from '../app.module';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  /* This we may use in case of we want to manually change the content of component
  In bigger projects*/
  // changeDetection: ChangeDetectionStrategy.OnPush

})
export class TestComponent implements OnInit, OnChanges {
  @Input() users!: { username: string }[];

  constructor(    
    // With this we detach the whole component
    private cdRef: ChangeDetectorRef,
    
    private injector: Injector
    ) {
    this.cdRef.detach();
    
   const value =  this.injector.get(myCustomToken);
  
   console.log('>>> this.injector.get(myCustomToken) >>>',value);   

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.users.length > 3) {
      this.cdRef.detectChanges();
    }

    console.log('>>> ngOnChanges(changes: SimpleChanges)', changes);
  }

  ngOnInit(): void {
    //
    this.cdRef.detectChanges();
  }
}

import {
  Directive,
  Input,
  OnChanges,
  Optional,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appMyIf]',
  exportAs: 'appMyIf'
})
export class MyIfDirective implements OnChanges {

  @Input() appMyIf = false;
  @Input() template!: TemplateRef<{value: string; $implicit: string}> | undefined;

  constructor(
    @Optional() private templateRef: TemplateRef<{value: string; $implicit: string}>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {

    if (this.appMyIf) {

      const template = this.templateRef || this.template;

      if (this.appMyIf = false) {
        return;
      }
      this.viewContainer.createEmbeddedView(
        template, {value: 'TESTING 123...', $implicit: '$implicit example'});

    } else {
      this.viewContainer.clear();
    }
  }
}

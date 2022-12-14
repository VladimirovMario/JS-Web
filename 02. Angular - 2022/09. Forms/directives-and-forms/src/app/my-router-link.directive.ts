import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';


@Directive({
  selector: '[appMyRouterLink]',
})

export class MyRouterLinkDirective implements OnInit, OnDestroy {

  @Input() appMyRouterLink!: string;
  @Input() template!: TemplateRef<any>;

  viewHasBeenCreated: boolean = false;

  unSubscribe: (() => void)[] = [];

  constructor(
     private elementRef: ElementRef,
     private renderer: Renderer2,
     private viewContainer: ViewContainerRef,
   
     ) {
  
    // console.log(this.elementRef);
    // ElementRef {nativeElement: div}
    // this.renderer.setAttribute(this.elementRef.nativeElement, `data-test`, '123' );

    this.unSubscribe.push(this.renderer.listen(this.elementRef.nativeElement,
      'mouseover', this.mouseOverHandler));

    this.unSubscribe.push(this.renderer.listen(this.elementRef.nativeElement,
      'mouseleave', this.mouseLeaveHandler));
  }

  // If we want (this) to be the same.
  // We have to call the handler like:  mouseOverHandler = (e: MouseEvent) =>
  mouseOverHandler = (e: MouseEvent) => {
    // console.log(e);
    // MouseEvent {isTrusted: true, screenX: 1386, screenY: 137, clientX: 104, clientY: 25, …}

    this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'red');
    // console.log(this.unSubscribe);
    // (2) [ƒ, ƒ]
    //  0:() => this.removeEventListener(element, eventName, handler)
    //  1:() => this.removeEventListener(element, eventName, handler)
    //  length:2
    //  [[Prototype]]: Array(0)

    if (this.viewHasBeenCreated) { return }
    this.viewContainer.createEmbeddedView(this.template);
    this.viewHasBeenCreated = true;
  };

  mouseLeaveHandler = (e: MouseEvent) => {
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'initial');
    this.viewContainer.clear();
    this.viewHasBeenCreated = false;
  };

  ngOnInit(): void {
    // console.log('>>> this.appMyRouterLink <<<',this.appMyRouterLink);
    // /path/for/studding
    // console.log('>>> this.template <<<',this.template);
    // TemplateRef {_declarationLView: LComponentView(37), _declarationTContainer: TNode, elementRef: ElementRef}
   
  }

  ngOnDestroy(): void {
    this.unSubscribe.forEach((func) => func());
  }
}

/*
    // Anti pattern in Angular
    document.getElementById();
    document.querySelectorAll();
    */

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

/*
// Working with abstractions
import { Provider } from "@angular/core";

  class Renderer {
  
}
interface IRender<T> {
  createTextElement(content: string): T;
}

class DOMRenderer implements IRender<HTMLElement> {
  private createElement(elementType: string, content: string): HTMLElement {
    const el = document.createElement(elementType);
    el.textContent = content;
    return el;
  }

  createTextElement(content: string): HTMLElement {
    return this.createElement('p', content);
  }
}

class MDRenderer implements IRender<any> {
  createTextElement(content: string) {
    return '```' + content + '```';
  }
}

const render = new MDRenderer();//DOMRenderer();

const providers: Provider[] = [
  {
    provide: Renderer,
    useClass: DOMRenderer 
  }
];

const providers2: Provider[] = [
  {
    provide: Renderer,
    useClass: MDRenderer
  }
]

render.createTextElement('HELLO WORD');
*/
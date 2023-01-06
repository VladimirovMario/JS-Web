// JavaScript Monkey Patching 
const _setInterval = window.setInterval;
(window as any).setInterval = function (...args: any[]): number {
  console.log('setInterval was called', args);
  return _setInterval.apply(this, args as any) as unknown as number;
}

// counter = 0;
// setInterval(()=>{this.counter++},3000)


/*
setInterval was called 

(2) [ƒ, 3000]
0: () => { this.counter++; }
length: 0
name: ""
arguments:(...)
caller:(...)
[[FunctionLocation]]:app.component.ts:11
[[Prototype]]:ƒ ()
[[Scopes]]:Scopes[2]
1:3000
length:2
[[Prototype]]:Array(0)
*/
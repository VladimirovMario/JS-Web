import { Observable, map, interval } from 'rxjs';

function getValue() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Test');
    }, 3000);
  });
}

/*
function getValue2(callback: (...args: any[]) => void) {
  setTimeout(() => {
    callback('Test');
  }, 3000);
}
getValue2( function (value) { console.log(value);});
*/

// array chain SYNC
[1]
  .map(function (x) {
    return x + 1;
  })
  .map(function (x) {
    return x * x;
  });

// promise chain ASYNC
Promise.resolve(1)
  .then(function (value) {
    console.log(value);
  })
  .then()
  .then();

// Array chain SYNC
[1, 2, 3, 4]
  .map(function (x) {
    return x + 1;
  })
  .map(function (x) {
    return x * x;
  });

// ASYNC
1;
const observable = new Observable((subscriber) => {
  subscriber.next(100);
  subscriber.next(200);
  subscriber.next(300);
  subscriber.complete();
});

observable.subscribe(console.log);

2;
const obs = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});

console.log('just before subscribe');
obs.subscribe({
  next(x) {
    console.log('got value ' + x);
  },

  error(err) {
    console.error('something wrong occurred: ' + err);
  },

  complete() {
    console.log('done');
  },
});
console.log('just after subscribe');

/*
  just before subscribe
  main.ts:30 got value 1
  main.ts:30 got value 2
  main.ts:30 got value 3
  main.ts:39 just after subscribe
  main.ts:30 got value 4
  main.ts:36 done
   */

3; // Custom function
function interval1(intervalValue: number = 0) {
  let counter: number = 0;

  return new Observable<number>((subscriber) => {
    setInterval(() => {
      subscriber.next(counter++);
    }, 2000);
  });
}
interval1()
  .pipe(map((x) => x + 1))
  .subscribe(console.log);

4; // Factory function from the lybrary
interval(3000)
  .pipe(map((x) => x + 1))
  .subscribe(console.log);

5; // lazy evaluation
const stream$ = interval(3000).pipe(
  map((x) => x + 1),
  map((x) => x + 1)
);

setTimeout(() => {
  const sub = stream$.subscribe(console.log);

  setTimeout(() => {
    sub.unsubscribe();
  }, 10000);
}, 3000);

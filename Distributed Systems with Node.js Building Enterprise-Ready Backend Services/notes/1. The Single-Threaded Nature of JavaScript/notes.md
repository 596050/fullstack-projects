The event loop used by Node.js is covered more in “The Node.js Event Loop” on
page 9, but for now just think of it as an infinitely running loop that
continuously checks to see if there is work to perform. When it finds something
to do, it begins its task—in this case it executes a function with a new call
stack—and once the function is complete, it waits until more work is ready to be
performed.

---

## Surprise Interview Question

This is a question that I’ve asked a few times while interviewing candidates for
advanced JavaScript roles: If the code in Example 1-2 were executed, in what
order would you expect the messages to be printed to the screen? And, as a
bonus, how much time would you expect to pass before each message is printed?
Example 1-2. JavaScript timing question

setTimeout(() => console.log('A'), 0);

console.log('B');

setTimeout(() => console.log('C'), 100);

setTimeout(() => console.log('D'), 0);

leti=0;

while (i < 1_000_000_000) { // Assume this takes ~500ms

let ignore = Math.sqrt(i);

i++;

}

console.log('E');

Write down the order that you think the messages will be printed in, as well as
how long it takes each message to print since the start of the script. The
answer and a detailed explanation is provided at the end of this section in
Table 1-1.

The solution to the surprise interview question is provided in Table 1-1. The
most important part is the order that the messages print, and the bonus is the
time it takes them to print. Consider your bonus answer correct if you’re within
a few milliseconds of the timing. Table 1-1. Surprise interview solution Log B E
A D C Time 1ms 501ms 502ms 502ms 502ms

---

Since JavaScript applications are mostly run in a single-threaded manner, two
call stacks won’t exist at the same time, which is another way of saying that
two functions cannot run in parallel.1 This implies that multiple copies of an
application need to be run simultaneously by some means to allow the application
to scale. Several tools are available to make it easier to manage multiple
copies of an applica‐ tion. “The Cluster Module” on page 53 looks at using the
built-in cluster module for routing incoming HTTP requests to different
application instances. The built-in worker_threads module also helps run
multiple JavaScript instances at once. The child_process module can be used to
spawn and manage a full Node.js process as well.

Since objects cannot be directly shared with the three aforementioned
approaches, some other method for communicating between the different isolated
JavaScript con‐ texts is needed. Such a feature does exist and is called message
passing. Message pass‐ ing works by sharing some sort of serialized
representation of an object/data (such as JSON) between the separate isolates.
This is necessary because directly sharing objects is impossible, not to mention
that it would be a painful debugging experience if two separate isolates could
modify the same object at the same time. These types of issues are referred to
as deadlocks and race conditions.

By using worker_threads it is possible to share memory between two different
JavaScript instances. This can be done by creating an instance of
SharedArrayBuffer and passing it from one thread to another using the same
postMessage(value) method used for worker thread message passing. This results
in an array of bytes that both threads can read and write to at the same time.

<mark>Overhead is incurred with message passing when data is serialized and
deserialized. Such overhead doesn’t need to exist in languages that support
proper multithreading, as objects can be shared directly.

This is one of the biggest factors that necessitates running Node.js
applications in a distributed manner. In order to handle scale, enough instances
need to run so that any single instance of a Node.js process doesn’t completely
saturate its available CPU. </mark>

The first thing that happens is the function to log A is scheduled with a
timeout of 0ms. Recall that this doesn’t mean the function will run in 0ms;
instead it is scheduled to run as early as 0 milliseconds but after the current
stack ends.

Once that’s done, the event loop looks for more work to do. It checks the queue
and sees that there are three tasks scheduled to happen. The order of items in
the queue is based on the provided timer value and the order that the
setTimeout() calls were made. So, it first processes the log A function. At this
point the script has been run‐ ning for roughly half a second, and it sees that
log A is roughly 500ms overdue, and so that function is executed. The next item
in the queue is the log D function, which is also roughly 500ms overdue.
Finally, the log C function is run and is roughly 400ms overdue.

## Quick Node.js Overview

Node.js fully embraces the Continuation-Passing Style (CPS) pattern throughout
its internal modules by way of callbacks—functions that are passed around and
invoked by the event loop once a task is complete. In Node.js parlance,
functions that are invoked in the future with a new stack are said to be run
asynchronously. Conversely, when one function calls another function in the same
stack, that code is said to run synchronously.

This is where things start to get interesting. Node.js itself is multithreaded.
The lower levels of Node.js are written in C++. This includes third-party tools
like libuv, which handles operating system abstractions and I/O, as well as V8
(the JavaScript engine) and other third-party modules. The layer above that, the
Node.js binding layer, also contains a bit of C++. It’s only the highest layers
of Node.js that are written in JavaScript, such as parts of the Node.js APIs
that deal directly with objects provided by userland.

## The Node.js Event Loop

Both the JavaScript that runs in your browser and the JavaScript that runs in
Node.js come with an implementation of an event loop. They’re similar in that
they both schedule and execute asynchronous tasks in separate stacks. But
they’re also different since the event loop used in a browser is optimized to
power modern single page applications, while the one in Node.js has been tuned
for use in a server. This section covers, at a high level, the event loop used
in Node.js. Understanding the basics of the event loop is beneficial because it
handles all the scheduling of your application code —and misconceptions can lead
to poor performance.

As the name implies, the event loop runs in a loop. The elevator pitch is that
it man‐ ages a queue of events that are used to trigger callbacks and move the
application along.

At a low level, the operating system notifies the program that something has
hap‐ pened. Then, libuv code inside the program springs to life and figures out
what to do. If appropriate, the message then bubbles up to code in a Node.js
API, and this can finally trigger a callback in application code. The event loop
is a way to allow these events in lower level C++ land to cross the boundary and
run code in JavaScript.

## Event Loop Phases

The event loop has several different phases to it. Each one of these phases
maintains a queue of callbacks that are to be executed. Call‐ backs are destined
for different phases based on how they are used by the application. Here are
some details about these phases:

> Poll

> The poll phase executes I/O-related callbacks. This is the phase that
> application code is most likely to execute in. When your main application code
> starts run‐ ning, it runs in this phase.

> Check

> In this phase, callbacks that are triggered via setImmediate() are executed.

> Close

> This phase executes callbacks that are triggered via EventEmitter close
> events. For example, when a net.Server TCP server closes, it emits a close
> event that runs a callback in this phase.

> Timers

> Callbacks scheduled using setTimeout() and setInterval() are executed in this
> phase.

> Pending

> Special system events are run in this phase, like when a net.Socket TCP socket
> throws an ECONNREFUSED error.

To make things a little more complicated, there are also two special microtask
queues that can have callbacks added to them while a phase is running. The first
microtask

queue handles callbacks that have been registered using process.nextTick().3 The
second microtask queue handles promises that reject or resolve. Callbacks in the
microtask queues take priority over callbacks in the phase’s normal queue, and
call‐ backs in the next tick microtask queue run before callbacks in the promise
microtask queue.

When the application starts running, the event loop is also started and the
phases are handled one at a time. Node.js adds callbacks to different queues as
appropriate while the application runs. When the event loop gets to a phase, it
will run all the callbacks in that phase’s queue. Once all the callbacks in a
given phase are exhausted, the event loop then moves on to the next phase. If
the application runs out of things to do but is waiting for I/O operations to
complete, it’ll hang out in the poll phase.

Example 1-5. event-loop-phases.js

```javascript
const fs = require('fs');

setImmediate(() => console.log(1));

Promise.resolve().then(() => console.log(2));

process.nextTick(() => console.log(3));

fs.readFile(__filename, () => {
  console.log(4);
  setTimeout(() => console.log(5));
  setImmediate(() => console.log(6));
  process.nextTick(() => console.log(7));
});

console.log(8);
```

The log statements have been printed in this order: 8, 3, 2, 1, 4, 7, 6, 5.

When it comes to async functions, and operations that use the await keyword,
code still plays by the same event loop rules.

```javascript
const sleep_st = t => new Promise(r => setTimeout(r, t));
const sleep_im = () => new Promise(r => setImmediate(r));
(async () => {
  setImmediate(() => console.log(1));
  console.log(2);
  await sleep_st(0);
  setImmediate(() => console.log(3));
  console.log(4);
  await sleep_im();
  setImmediate(() => console.log(5));
  console.log(6);
  await 1;
  setImmediate(() => console.log(7));
  console.log(8);
})();
```

2, 1, 4, 3, 6, 8, 5, 7.

## Event Loop Tips

there are a few important things to keep in mind when it comes to the event
loop.

Don’t starve the event loop. Running too much code in a single stack will stall
the event loop and prevent other callbacks from firing. One way to fix this is
to break CPU-heavy operations up across multiple stacks. For example, if you
need to process 1,000 data records, you might consider breaking it up into 10
batches of 100 records, using setImmediate() at the end of each batch to
continue processing the next batch. Depending on the situation, it might make
more sense to offload processing to a child process.

```javascript
function foo(count, callback) {
  if (count <= 0) {
    return process.nextTick(() => callback(new TypeError('count > 0')));
  }
  myAsyncOperation(count, callback);
}
```

In this case, either using setImmediate() or process.nextTick() is okay; just
make sure you don’t accidentally introduce recursion. With this reworked
example, the call‐ back is always run asynchronously. Ensuring the callback is
run consistently is impor‐ tant because of the following situation:

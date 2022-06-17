## Performance Timer Multi

`performance-timer-multi`, is a tiny class that allows you to debug code and see where the most time is consumed.  
It is specifically made for processes that run in parallel and multiple times.  
After killing the running process, a summary is provided with the defined steps and their consumed times.  

The output looks like this:  
```
--------------------------------------------------------------------------------
Total execution time: 1575399 ms 1576 s
Shortest cycle time: 0 ms
Longest cycle time: 25646 ms
Analysis per item:
total   average short   long    amount  name
143518  100     0       1549    1439    resolveTrip
119567  130     13      1342    917     insert 1
124173  135     19      1340    917     insert 2
114990  125     20      715     917     insert 3
4178    12      0       2426    351     db release
--------------------------------------------------------------------------------
```


## Usage
```js
const PerformanceTracker = require('./PerformanceTracker');
const performanceTracker = new PerformanceTracker();
process.on('SIGINT', performanceTracker.output.bind(performanceTracker));

function onIncomingMessage() {
  const p = performanceTracker.start();
  // do something
  p.log('something done');
  // do something else
  p.log('something else done');
  p.done();
}

onIncomingMessage();
onIncomingMessage();
onIncomingMessage();
```

Quit the process to show the output.  
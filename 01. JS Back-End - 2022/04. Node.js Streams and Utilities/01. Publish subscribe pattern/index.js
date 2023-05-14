require("./m1");
require("./m2");
require("./m3");

1;/*
new subscriber for message
new subscriber for message
---
received message
module 1 received data 0
Current running total is  0
---
received message
module 1 received data 1
Current running total is  1
---
received message
module 1 received data 2
Current running total is  3
---
received message
module 1 received data 3
Current running total is  6
---
received message
module 1 received data 4
Current running total is  10
*/

2;
/*
module 1 received data 0
Current running total is  0
module 1 received data 1
Current running total is  1
module 1 received data 2
Current running total is  3
module 1 received data 3
Current running total is  6
*/
# Aligning Resources



## Introduction 

REST is all about resources. So, the tedious task of changing the state of the resources keep popping up again and again. Web is a wonderful platform to build distributed systems. So, it might be possible that many people are trying to change the state of the resource simultaneously. How do we make sure, we keep the right state of the resource. 

I was reading about the REST other day, where I read about how do we align resources. The implementation in the book was in .NET(I have no idea what it is) and in Java. I have a background of python and javascript, so I decided to implement this simple exercise using Node.js. 

## Mechanism 

The idea behind this is that HTTP provides a way to assign E-Tag header to requests and response. An E-Tag is essentially an hash function generated by the sever. Now when a client wants to update it, it needs to send a E-tag header in the request to denote the state of the resource, which it had. If the state(represented by hash here) is up-to-date with the hash stored on the server, we let the client update the resource. If not,  it won't be able to complete the request. To really make an update, it needs to issue the 'GET' for the same resource and read the latest 'E-Tag' and then move ahead with updation with the latest E-Tag in the request. The server will now update the hash and issue it to the client. 

## Implementation 

The implementation seems very straight forward. Good ideas are often are very simple. It's not a great example, though. It halts the server every now and then, it uses synchronous mechanism to read and write files, and does not use express for routing, but that's all right for the purpose of this experiment.


## Result

Able to modify only the latest and updated state of the resource. Pretty cool, right? 



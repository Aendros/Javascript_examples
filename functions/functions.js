// functions are objects. They are linked to Function.prototype wich is also
// linked to Object.prototype.


////////////////////////////////////////////////////////////////////////////////
//                            FUNCTION LITERAL

var add = function (a, b) {     // store a function in one variable
    return a + b;
};

////////////////////////////////////////////////////////////////////////////////
//                      METHOD INVOCATION PATTERN

// When a function is stored as a property of an object, we call it method.

var myObject =  {
    value: 0,
    increment: function (inc) {
        this.value += typeof inc === 'number' ? inc : 1;
    }
};

myObject.increment();
document.writeln(myObject.value);       // 1

myObject.increment(2);
document.writeln(myObject.value);       // 3

/*
 A method can use 'this' to access the object, so it can retrieve values from
the object or modify the object. Methods that get their object context from 'this' are colled 'public methods'-
*/

////////////////////////////////////////////////////////////////////////////////
//                      FUNCTION INVOCATION PATTERN ?????????????????????????

// When a function is not a property of an object, then it is invoked as a func

var sum = add(3, 5);        // sum is 8

// As an error in the javascript design, 'this' will be bound to the global
// object. There is a easy workaround: if the method defines a variable and
// assigns it the value of 'this', the inner function will have access to 'this'
// through that variable. By convention, the name of that variable is 'that'

// Augment myObject with a double method

myObject.double = function () {
    var that = this;        // workaround

    var helper = function () {
        that.value = add(that.value, that.value);
    };

    helper();   // Invoke helper as a function.
};

myObject.double();
document.writeln(myObject.value);


////////////////////////////////////////////////////////////////////////////////
//                      CONSTRUCTOR INVOCATION PATTERN ** Not recommended

/*
 If a function is invoked with the 'new' prefix, then a new object will be
 created with a hidden link to the value of the fucntion's 'prototype' menber,
 and 'this' will be bound to that new object.

 The 'new' prefix also changes the behavior of the return statement.
*/

// Create a constructor function called Quo. It makes an object with a status
// property

var Quo = function (string) {
    this.status = string;
};

// Give all instances of Quo public method called get_status

Quo.prototype.get_status = function () {
    return this.status;
};

// Make an instance of Quo.

var myQuo = new Quo('confused');    // I'm totally confused

document.writeln(myQuo.get_status()); // confused

////////////////////////////////////////////////////////////////////////////////
//                      APPLY INVOCATION PATTERN ????????????????

/*
 The 'apply' method lets us construct an array of arguments to use to invoke a
 function. It also lets us choose the value of this. The apply method takes
 two parameters. The first is the value that should be bound to this. The
 second is an array of parameters.
*/

// Make an array of 2 numbers and add them.

var array = [3, 4];
var sum = add.apply(null, array);   // sum is 7

// Make an object with a status member.

var statusObject = {
    status: 'A-OK'
};

// statusObject does not inherit from Quo.prototype,
// but we can invoke the get_status method on statusObject even thought
// statusObject does not have a get_status method.

var status = Quo.prototype.get_status.apply(statusObject);  // status is 'A-OK'

////////////////////////////////////////////////////////////////////////////////
//                              ARGUMENTS PARAMETER

/*
 The 'arguments' 'array' (not really an array, similar to) gives the function
 access to all of the arguments that were supplied with the invocation,
 including excess arguments that were not assigned to parameters. This make
 possible  to write functions that take an unspecified number of parameters:
*/

// Make a function that adds a lot of stuff.

var sum = function () {
    var i, sum = 0;
    for (i = 0; i < arguments.length; i += 1) {
        sum += arguments[i];
    }
    return sum; // A function allways return a value, if the 'return' is not
                // specified, then 'undefined' is returned.
                // If the function wasw invoked with the 'nes' prefix and the
                // 'return' value is not an object, then 'this' (the new object)
                // is returned instead.
};

document.wirteln(sum(4, 8, 15, 16, 23, 42)); // 108

////////////////////////////////////////////////////////////////////////////////
//                              EXCEPTIONS

// Exceptions are triggered when something interfere with the normal flow of a
// program.

var add = function (a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw {
            name: 'TypeError',
            message: 'add needs numbers'
        };
    }
    return a + b;
};

// Make a try_it function that calls the new add function incorrectly.

var try_it = function () {
    try {
        add("seven");
    } catch (e) {
        document.writeln(e.name + ':' + e.message);
    }
};

try_it();

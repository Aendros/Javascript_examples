          //Objects literals

var empty_object = {};

var stooge = {
    "fist-name": "Jerome",
    "last-name": "Howard"
};

/* The quotes around a property's name in an object literal are optional if the
name would be a legal Javascript name and not a reserved word. So quotes are
required around "first-name", but are optional around first_name.
*/

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// A propety's value can be obtained from any expression, including another
// object literal. Objects an nest:

var flight = {
        airlines: "Oceanic",
        number: "815",
        departure: {
            IATA: "SYD",
            time: "2004-09-22 14:55",
            city: "Sydney"
        },
        arrival: {
            IATA: "LAX",
            time: "2004-09-23 10:42",
            city: "Los Angeles"
        }
    };

// Values can be retrieved from an object
var t = stooge["first-name"];    // "Jerome"
var t = flight.departure.IATA;   // "SYD" This is the preferred method.

// The undefined value is prodcued if an attemp is made to nonexistent menber:
var t = stooge["FIRST-name"];    // undefined
var t = flight.status;           // undefined

// The || operator can be used to fill in default values:

var middle = stooge["middle-name"] || "(none)";
var status = flight.status || "unknown";

// Attemping to retrieve values from undefined will throw a TypeError exception.
// This can be guarded aginst with the && operator:

var t = flight.equipment;    // undefined
var t = flight.equipment.model;  // Throw "TypeError"
var t = flight.equipment && flight.equipment.model;  // undefined


////////////////////////////////////////////////////////////////////////////////
//////////////////////////// UPDATE VALUES /////////////////////////////////////

// A value can be updated by assignment, if the property already exist.

stooge['first-name'] = 'Jerome';

// If the property does not exist, the object is augmented:

stooge['middle-name'] = 'Lester';
stooge.nickname = 'Curly';
flight.equipment = {
    model: 'Boeing 747'
};
flight.status = 'overdue';

//****************************************************************************//
//*********** Object ar passed by reference. Never copied: *******************//
//****************************************************************************//

var x = stooge;
x.nickname = 'Curly';
var nick = stooge.nickname; // nick is 'Curly' because x and stooge
                            // are references to the same object.

var a = {}, b = {}, c = {};   // a, b, and c each refer to a different objects

a = b = c = {};         // a, b, and c all refer to the same object.

////////////////////////////////////////////////////////////////////////////////
//                              OBJECT.PROTOTYPE

// every object is linked to a prototype object from which it can inherit
// properties. THE FATHER OBJECT. **This will be explained after, but keep it in
// mind for the next examples.

if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        var F = function () {};
        F.prototype = o;
        return new F();
    };
}
var another_stooge = Object.create(stooge);

// The prototype link has no effect on updating. The object's prototype is not
// touched. The prototype link is used only in retrieval.

another_stooge['first-name'] = 'Harry';
another_stooge['middle-name'] = 'Moses';
another_stooge.nickname = 'Moe';

stooge.profession = 'actor';        // 'actor'
var t = another_stooge.proffesion;  // 'actor'


////////////////////////////////////////////////////////////////////////////////
//                              REFLICTION (typeof)

// typeof is used to determining the type of a property

var t = typeof flight.number;    // 'number'
var t = typeof flight.satus;     // 'string'
var t = typeof flight.arrival;   // 'object'
var t = typeof flight.manifest;  // 'undefined'

// Some care must be taken because any property on the prototype chain can
// produce a value:

var t = typeof flight.toString;  // 'function'
var t = typeof flight.constructor; // 'funcion'

// The workaround here involves the method hasOwnProperty which returns true if
// the object has a particular property.

var t = flight.hasOwnProperty('number');     // true
var t = flight.hasOwnProperty('constructor');    // false

////////////////////////////////////////////////////////////////////////////////
//                              ENUMERATION

// Enumerate properties with a for loop

var name;

for (name in another_stooge) {
    if (typeof another_stooge[name] !== 'fucntion') {
        document.writeln(name + ': ' + another_stooge(name));
    }
}

// Another option, if you want to list the properties in a particular mode:

var i;
var properties = [
    'first-name',
    'middle-name',
    'last-name',
    'profession'
];

for (i = 0; i < properties.length; i += 1) {
    document.writeln(properties[i] + ':' + another_stooge[properties[i]]);
}

// Using 'for' instead 'for in', we get the properties we wanted without
// worrying about the prototype chain and in the order we wanted.

////////////////////////////////////////////////////////////////////////////////
//                              DELETE PROPERTIES

// By using delete method

var t = another_stooge.nickname;    // 'Moe'

delete another_stooge.nickname;

var t = another_stooge.nickname;    // 'Curly'frome the prototype Object

//****************************************************************************//
//************************* GLOBAL VARIABLES *********************************//
//****************************************************************************//

// Global variables are dangerous. One way to minimize the use of global
// variables is to create a single global variable for your app. This variable
// will becomes the container for your app.

var MYAPP = {};

MYAPP.stooge = {
    "first-name": "Joe",
    "last-name": "Howard"
};

MYAPP.flight = {
    airline: "Oceanic",
    number: 815,
    departure: {
        IATA: "SYD",
        time: "2004-09-22 14:55",
        city: "Sydney"
    },
    arrival: {
        IATA: "LAX",
        time: "2004-09-23 10:42",
        city: "Los Angeles"
    }
};

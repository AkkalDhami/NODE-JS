import addition from "./app.js";
import { subtract } from "./app.js";

// import {product} from "./app.js";
import { divide, factorial } from "./app.js"; //* we can import multiple export

import * as app from "./app.js"; //* agregate import 


//? if we don't use {} then it will import the default export

console.log(addition(55, 55));

console.log(subtract(55, 50));

console.log(app.product(5, 2));

console.log(divide(5, 2));

console.log(factorial(5));
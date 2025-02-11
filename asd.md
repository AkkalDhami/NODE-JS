# Express.js Chapter-wise Notes

## Table of Contents

1. [Introduction to Express.js](#17_intro_to_expressjs)
2. [Environment Variables in Express](#18_Environment_variable_in_expressjs)
3. [ZOD Validation](#19_ZOD_Validation)
4. [Sending Files in Express](#20_sending_files_in_expressjs)
5. [Serving Static Files in Express](#20_serve_static_file_in_expressjs)
6. [ES Module Caveats](#21_es_module_Caveats)
7. [Route Params and Query Params in Express](#22_route_params_and_query_params_in_expressjs)

---

## 1. Introduction to Express
### [17_intro_to_express.js](#)
Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

**Key Points:**
- Middleware
- Routing
- Request & Response Objects
- Error Handling

---

## 2. Environment Variables in Express
### [18_Environment_variable_in_express.js](#)
Environment variables store configuration settings and sensitive data securely.

**Key Points:**
- Using `dotenv`
- `process.env`
- `.env` file configuration

---

## 3. ZOD Validation
### [19_ZOD_Validation](#)
ZOD is a TypeScript-first schema declaration and validation library.

**Key Points:**
- Schema validation
- Parsing request data
- Error handling in validation

---

## 4. Sending Files in Express
### [20_sending_files_in_express.js](#)
Express allows sending files as responses.

**Key Points:**
- `res.sendFile()`
- File MIME types
- Security considerations

---

## 5. Serving Static Files in Express
### [20_serve_static_file_in_express.js](#)
Static files such as images, CSS, and JavaScript can be served using Express.

**Key Points:**
- `express.static()` middleware
- Configuring static folder

---

## 6. ES Module Caveats
### [21_es_module_Caveats](#)
Differences between CommonJS and ES Modules in Node.js.

**Key Points:**
- `import` vs `require`
- Handling `package.json` type
- Module resolution issues

---

## 7. Route Params and Query Params in Express
### [22_route_params_and_query_params_in_express.js](#)
Express allows handling dynamic routes and query parameters.

**Key Points:**
- `req.params`
- `req.query`
- Route parameter validation


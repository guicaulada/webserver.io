# webserver.io #

**webserver.io** is a simple webserver with socket to get things started.

## Requirements
* [express](https://www.npmjs.com/package/express)
* [socket.io](https://www.npmjs.com/package/socket.io) 
* [ejs](https://www.npmjs.com/package/ejs)

## Documentation ##
### Getting Started

Install webserver.io using npm:

```bash
$ npm install webserver.io
```

You can now use webserver.io like so:

```js
let server = new Server()

server.app.use(express.static(path.join(__dirname, 'public')))
server.app.set('views', path.join(__dirname, 'public'))

server.http.listen(4000)

console.log('Terminal listening on localhost:4000')
```

Refer to the [webserver.io examples](https://github.com/Sighmir/webserver.io/tree/master/example) for more information.  

## License ##
```
webserver.io - A simple webserver with socket to get things started.
Copyright (C) 2019  Guilherme Caulada (Sighmir)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
```

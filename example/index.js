/*
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
*/

const path = require('path')
const express = require('express')
const Server = require('..')

let server = new Server()

server.app.set('view engine', 'ejs')
server.app.use(express.static(path.join(__dirname, 'public')))
server.app.set('views', path.join(__dirname, 'public'))

server.app.get('/', (req, res) => {
    res.render('./index.ejs')
})

server.http.listen(4000)

console.log('Terminal listening on localhost:4000')
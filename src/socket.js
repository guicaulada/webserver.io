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

const WebSocket = require('ws')

class ExtendableProxy {
  constructor(getset = {}) {
    return new Proxy(this, getset);
  }
}

class Socket extends ExtendableProxy {
  constructor(server) {
    super({
      get: (socket, method) => {
        if (socket[method]) return socket[method]
        else return socket.ws[method]
      }
    })
    let self = this
    self.ws = new WebSocket.Server({ noServer: true })

    server.on('upgrade', (req, socket, head) => {
      self.ws.handleUpgrade(req, socket, head, (ws) => {
        self.ws.emit('connection', ws, req)
      })
    })

    self.ws.on('connection', (client) => {
      client.isAlive = true

      client.heartbeat = () => client.isAlive = true
      client.on('pong', client.heartbeat)

      client.on('disconnect', () => {
        client.disconnect(true)
      })

      client.on('finished', () => {
        client.end()
      })
    })

    self.heartbeat = setInterval(() => {
      self.ws.clients.forEach((client) => {
        if (client.isAlive === false) return client.terminate()
        client.isAlive = false
        client.ping(() => { })
      })
    }, 30000)
  }

  send(data) {
    let self = this
    self.ws.clients.forEach((client) => {
      client.send(data)
    })
  }
}

module.exports = Socket
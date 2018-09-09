const express = require('express');

module.exports = class TestServer {
  constructor(filePath) {
    this.app = express();
    this.app.use(express.static(filePath));
  }

  start(opts) {
    let port = 0;
    if (opts && opts.port) {
      port = opts.port;
    }

    return new Promise((resolve) => {
      this.server = this.app.listen(port, () => {
        const addr = this.server.address();
        if (typeof addr === 'string') {
          resolve(addr);
          return;
        }
        let host = addr.address;
        if (addr.family === 'IPv6') {
          // host = `[${host}]`;
          console.warn('Setting host to localhost for IPv6.');
          host = 'localhost';
        }
        resolve(`http://${host}:${addr.port}`);
      });
    });
  }

  close() {
    return new Promise((resolve) => {
      this.server.close(resolve);
    });
  }
}

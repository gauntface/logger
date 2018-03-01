import * as express from 'express';
import * as http from 'http';
import { Application } from 'express-serve-static-core';

type StartOptions = {
  port?: number;
};

export class TestServer {
  private app: Application;
  private server: http.Server;

  constructor(filePath: string) {
    this.app = express();
    console.log(filePath);
    this.app.use(express.static(filePath));
  }

  start(opts?: StartOptions): Promise<string> {
    let port = 0;
    if (opts && opts.port) {
      port = opts.port;
    }

    return new Promise((resolve) => {
      this.server = this.app.listen(port, () => {
        const addr = this.server.address();
        let host = addr.address;
        if (addr.family === 'IPv6') {
          host = `[${host}]`;
        }
        resolve(`http://${host}:${addr.port}`);
      });
    });
  }

  close(): Promise<void> {
    return new Promise((resolve) => {
      this.server.close(resolve);
    });
  }
}

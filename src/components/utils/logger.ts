import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import url = require('url');
import { Logger } from 'winston';
@Injectable()
export class LogsMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  use(req: Request, res: Response, next: Function) {
    let temp = '';

    // Exclude auth controller for body logging.
    if (
      !url.parse(req.originalUrl).pathname.includes('/v1/auth/') &&
      req.method !== 'GET'
    ) {
      temp = `body: ${JSON.stringify(req.body)} `;
    } else if (req.method == 'GET') {
      temp = `query: ${JSON.stringify(req.query)} `;
    }

    this.logger.debug({
      message:
        `API call ` +
        `url: ${url.parse(req.originalUrl).pathname} ` +
        `method: ${req.method} `,
    });

    next();
  }
}

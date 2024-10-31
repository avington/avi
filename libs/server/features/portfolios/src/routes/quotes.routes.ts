import { Application } from 'express-ws';
import { updateAllQuotesStreamHandler } from '../commands/quotes/update-all-quotes-stream.command';

const wsQuoteRouter = (wsApp: Application, path: string) => {
  wsApp.ws(path, updateAllQuotesStreamHandler);
};

export { wsQuoteRouter };

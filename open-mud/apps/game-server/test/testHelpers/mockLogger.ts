import * as Sinon from 'sinon';
import pino from 'pino';

export default function (debugStub?: Sinon.SinonStub): pino.Logger {
  return {
    child: Sinon.stub().returnsThis(),
    debug: debugStub ? debugStub.returnsThis() : Sinon.stub().returnsThis(),
  } as unknown as pino.Logger;
}

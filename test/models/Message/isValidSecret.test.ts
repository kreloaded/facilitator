import Message from '../../../src/models/Message';
import assert from '../../test_utils/assert';

const web3utils = require('web3-utils');

describe('AuxiliaryChain::get', (): void => {
  const message = new Message(
    '0x000000000000000000000000000000000000000000000000000001',
  );

  message.secret = '1';

  it('should return true when hashlock is generated from correct secret', async (): Promise<void> => {
    const generatedHashLock = web3utils.keccak256(message.secret).toString();
    message.hashLock = generatedHashLock;
    const result = message.isValidSecret();

    assert.strictEqual(
      result,
      true,
      'Hashlock generated from secret should be same',
    );
  });

  it('should return false when for invalid secret', async (): Promise<void> => {
    message.hashLock = '12345';

    const result = message.isValidSecret();

    assert.strictEqual(
      result,
      false,
      'Hashlock generated from secret should be different',
    );
  });
});
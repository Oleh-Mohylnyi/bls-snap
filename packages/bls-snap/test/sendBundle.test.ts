/* eslint-disable import/no-named-as-default-member */
import { expect } from 'chai';
import { Mutex } from 'async-mutex';
import sinon from 'sinon';

import { ApiParams, SendBundleRequestParams } from '../src/types/snapApi';
import { sendBundle } from '../src/sendBundle';
import { SnapState } from '../src/types/snapState';
import * as config from '../src/utils/config';
import * as snapUtils from '../src/utils/snapUtils';
import * as blsUtils from '../src/utils/blsUtils';
import { WalletMock } from './utils/wallet.mock';
import {
  ACCOUNT_ZERO,
  AGGREGATOR_MOCK,
  BLS_ACCOUNT_ZERO,
  BUNDLE_ZERO,
  OPERATION_ZERO,
  TEST_CHAIN_ID_ZERO,
  TEST_NETWORK_ZERO,
  ZERO_ADDRESS,
} from './utils/constants';

describe('sendBundle', () => {
  const walletStub = new WalletMock();

  const state: SnapState = {
    [TEST_CHAIN_ID_ZERO]: {
      ...TEST_NETWORK_ZERO,
      accounts: [ACCOUNT_ZERO],
    },
  };
  const apiParams: ApiParams = {
    state,
    requestParams: {},
    wallet: walletStub,
    mutex: new Mutex(),
  };

  afterEach(function () {
    walletStub.reset();
  });

  it('should throw error if no account found', async function () {
    sinon.stub(config, 'getNetwork').returns(TEST_NETWORK_ZERO);
    const requestObject: SendBundleRequestParams = {
      chainId: TEST_CHAIN_ID_ZERO,
      senderAddress: ZERO_ADDRESS,
    };
    apiParams.requestParams = requestObject;

    await expect(sendBundle(apiParams)).to.be.rejected;
  });

  it('should throw error if no operations found', async function () {
    sinon.stub(config, 'getNetwork').returns(TEST_NETWORK_ZERO);
    const requestObject: SendBundleRequestParams = {
      chainId: TEST_CHAIN_ID_ZERO,
      senderAddress: ACCOUNT_ZERO.address,
    };
    apiParams.requestParams = requestObject;

    await expect(sendBundle(apiParams)).to.be.rejected;
  });

  it('should create account correctly', async () => {
    sinon.stub(config, 'getNetwork').returns(TEST_NETWORK_ZERO);
    sinon.stub(blsUtils, 'getWallet').resolves(BLS_ACCOUNT_ZERO);
    sinon.stub(blsUtils, 'getAggregator').returns(AGGREGATOR_MOCK);
    const requestObject: SendBundleRequestParams = {
      chainId: TEST_CHAIN_ID_ZERO,
      senderAddress: ACCOUNT_ZERO.address,
    };
    apiParams.requestParams = requestObject;
    apiParams.state[TEST_CHAIN_ID_ZERO].operations = [OPERATION_ZERO];

    const result = await sendBundle(apiParams);

    expect(result).to.be.eql({
      ...BUNDLE_ZERO,
      operations: [OPERATION_ZERO],
    });
  });

  it('should throw error if getAccount failed', async function () {
    sinon.stub(snapUtils, 'getAccount').throws(new Error());
    const requestObject: SendBundleRequestParams = {
      chainId: TEST_CHAIN_ID_ZERO,
      senderAddress: ZERO_ADDRESS,
    };
    apiParams.requestParams = requestObject;

    await expect(sendBundle(apiParams)).to.be.rejected;
  });
});
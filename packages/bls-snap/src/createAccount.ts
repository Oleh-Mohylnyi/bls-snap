/* eslint-disable jsdoc/require-jsdoc */
import { ethers } from 'ethers';
import { BlsWalletWrapper, validateConfig } from 'bls-wallet-clients';

import { ApiParams, CreateAccountRequestParams } from './types/snapApi';
import { ARBITRUM_GOERLI_NETWORK } from './utils/constants';
import { upsertAccount } from './utils/snapUtils';

export async function createAccount(params: ApiParams) {
  try {
    const { state, mutex } = params;
    const netCfg = validateConfig(ARBITRUM_GOERLI_NETWORK.config);

    const provider = new ethers.providers.JsonRpcProvider(
      'https://goerli-rollup.arbitrum.io/rpc',
    );

    // 32 random bytes
    const privateKey =
      '0x0001020304050607080910111213141516171819202122232425262728293031';

    // Note that if a wallet doesn't yet exist, it will be
    // lazily created on the first transaction.
    const account = await BlsWalletWrapper.connect(
      privateKey,
      netCfg.addresses.verificationGateway,
      provider,
    );

    await upsertAccount(
      { address: account.address, chainId: String(netCfg.auxiliary.chainid) },
      wallet,
      mutex,
      state,
    );

    return {
      address: account.address,
    };
  } catch (err) {
    console.error(`Problem found: ${err}`);
    throw err;
  }
}

/* eslint-disable jsdoc/require-jsdoc */
import { ApiParams, GetErc20TokensRequestParams } from './types/snapApi';
import { Erc20Token } from './types/snapState';
import * as snapUtils from './utils/snapUtils';

export async function getErc20Tokens(params: ApiParams): Promise<Erc20Token[]> {
  try {
    const { state, requestParams } = params;
    const { chainId } = requestParams as GetErc20TokensRequestParams;

    const erc20Tokens = snapUtils.getErc20Tokens(chainId, state);
    console.log(`getErc20Tokens:\n${JSON.stringify(erc20Tokens, null, 2)}`);

    return erc20Tokens || [];
  } catch (err) {
    console.error(`Problem found: ${err}`);
    throw err;
  }
}

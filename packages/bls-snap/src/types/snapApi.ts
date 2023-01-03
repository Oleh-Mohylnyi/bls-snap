import { Mutex } from 'async-mutex';
import { SnapState } from './snapState';

export type ApiParams = {
  state: SnapState;
  requestParams: ApiRequestParams;
  mutex: Mutex;
  wallet: any;
};

export type BaseRequestParams = {
  chainId: number;
};

export type GetNetworksRequestParams = Omit<BaseRequestParams, 'chainId'>;

export type RecoverAccountRequestParams = BaseRequestParams;

export type CreateAccountRequestParams = BaseRequestParams;

export type GetErc20TokensRequestParams = BaseRequestParams;

export type GetErc20TokenBalanceRequestParams = {
  tokenAddress: string;
  userAddress: string;
} & BaseRequestParams;

export type GetOperationsRequestParams = {
  senderAddress: string;
} & BaseRequestParams;

export type AddOperationRequestParams = {
  senderAddress: string;
  contractAddress: string;
  encodedFunction: string;
} & BaseRequestParams;

export type GetBundleRequestParams = {
  bundleHash: string;
} & BaseRequestParams;

export type GetBundlesRequestParams = {
  senderAddress: string;
  contractAddress?: string;
  bundleHash?: string;
} & BaseRequestParams;

export type SendBundleRequestParams = {
  senderAddress: string;
} & BaseRequestParams;

export type ApiRequestParams =
  | GetNetworksRequestParams
  | RecoverAccountRequestParams
  | CreateAccountRequestParams
  | GetErc20TokensRequestParams
  | GetErc20TokenBalanceRequestParams
  | GetOperationsRequestParams
  | AddOperationRequestParams
  | GetBundleRequestParams
  | GetBundlesRequestParams
  | SendBundleRequestParams;

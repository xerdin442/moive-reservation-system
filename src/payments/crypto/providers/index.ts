import { Provider } from '@nestjs/common';
import { CryptoHelperService } from '../helpers';
import Web3 from 'web3';
import { Connection } from '@solana/web3.js';

export const ETH_WEB3_PROVIDER_TOKEN = 'eth-web3-provider-token';
export const SOL_WEB3_PROVIDER_TOKEN = 'sol-web3-provider-token';

export const EthWeb3Provider: Provider = {
  provide: ETH_WEB3_PROVIDER_TOKEN,
  useFactory: (helper: CryptoHelperService) => {
    return new Web3(
      new Web3.providers.HttpProvider(helper.selectRpcUrl('base')),
    );
  },
  inject: [CryptoHelperService],
};

export const SolanaWeb3Provider: Provider = {
  provide: SOL_WEB3_PROVIDER_TOKEN,
  useFactory: (helper: CryptoHelperService) => {
    return new Connection(helper.selectRpcUrl('solana'), 'confirmed');
  },
  inject: [CryptoHelperService],
};

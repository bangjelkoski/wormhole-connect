// Legacy SDK
import {
  ChainConfig as BaseChainConfig,
  ChainName,
  TokenId,
  ChainResourceMap,
  Context,
  WormholeContext,
  WormholeConfig,
} from 'sdklegacy';

// SDKv2
import {
  Network as NetworkV2,
  Wormhole as WormholeV2,
  Chain as ChainV2,
  TokenAddress as TokenAddressV2,
} from '@wormhole-foundation/sdk';

import { Alignment } from 'components/Header';
import { WormholeConnectPartialTheme } from 'theme';
import { TransferDetails, WormholeConnectEventHandler } from 'telemetry/types';
import { SDKConverter } from './converter';

export enum Icon {
  'AVAX' = 1,
  'BNB',
  'BSC',
  'CELO',
  'ETH',
  'FANTOM',
  'POLYGON',
  'SOLANA',
  'USDC',
  'GLMR',
  'DAI',
  'USDT',
  'BUSD',
  'WBTC',
  'SUI',
  'APT',
  'SEI',
  'BASE',
  'OSMO',
  'TBTC',
  'WSTETH',
  'ARBITRUM',
  'OPTIMISM',
  'ATOM',
  'EVMOS',
  'KUJI',
  'PYTH',
  'INJ',
  'KLAY',
  'NTT',
  'SCROLL',
  'BLAST',
  'XLAYER',
}

export enum Route {
  Bridge = 'bridge',
  Relay = 'relay',
  CosmosGateway = 'cosmosGateway',
  CCTPManual = 'cctpManual',
  CCTPRelay = 'cctpRelay',
  TBTC = 'tbtc',
  ETHBridge = 'ethBridge',
  wstETHBridge = 'wstETHBridge',
  NttManual = 'nttManual',
  NttRelay = 'nttRelay',
}

// Used in bridging components
export type TransferSide = 'source' | 'destination';

export type SupportedRoutes = keyof typeof Route;

export type Network = 'mainnet' | 'testnet' | 'devnet';

// TODO: preference is fromChain/toChain, but want to keep backwards compatibility
export interface BridgeDefaults {
  fromNetwork?: ChainName;
  toNetwork?: ChainName;
  token?: string;
  requiredNetwork?: ChainName;
}

export interface ExtendedTransferDetails extends TransferDetails {
  fromWalletAddress: string;
  toWalletAddress: string;
}

export interface ValidateTransferResult {
  isValid: boolean;
  error?: string;
}

export type ValidateTransferHandler = (
  transferDetails: ExtendedTransferDetails,
) => Promise<ValidateTransferResult>;

// This is the integrator-provided JSON config
export interface WormholeConnectConfig {
  env?: Network; // TODO REMOVE; DEPRECATED
  network?: Network; // New name for this, consistent with SDKv2

  // External resources
  rpcs?: ChainResourceMap;
  rest?: ChainResourceMap;
  graphql?: ChainResourceMap;
  coinGeckoApiKey?: string;

  // White lists
  networks?: ChainName[]; // TODO REMOVE; DEPRECATED
  chains?: ChainName[]; // New name for this, consistent with SDKv2
  tokens?: string[];

  // Custom tokens
  tokensConfig?: TokensConfig;

  // Legacy support: allow theme to be in this config object
  // This should be removed in a future version after people have switched
  // to providing the theme as a separate prop
  customTheme?: WormholeConnectPartialTheme;
  mode?: 'dark' | 'light';

  // Callbacks
  eventHandler?: WormholeConnectEventHandler;
  validateTransferHandler?: ValidateTransferHandler;

  // UI details
  cta?: {
    text: string;
    link: string;
  };
  showHamburgerMenu?: boolean;
  explorer?: ExplorerConfig;
  bridgeDefaults?: BridgeDefaults;
  routes?: string[];
  cctpWarning?: {
    href: string;
  };
  pageHeader?: string | PageHeader;
  pageSubHeader?: string;
  menu?: MenuEntry[];
  searchTx?: SearchTxConfig;
  moreTokens?: MoreTokenConfig;
  moreNetworks?: MoreChainConfig;
  partnerLogo?: string;
  walletConnectProjectId?: string;
  previewMode?: boolean;

  // Route settings
  ethBridgeMaxAmount?: number;
  wstETHBridgeMaxAmount?: number;

  // NTT config
  nttGroups?: NttGroups;

  // Override to load Redesign
  useRedesign?: boolean;
}

// This is the exported config value used throughout the code base
export interface InternalConfig<N extends NetworkV2> {
  wh: WormholeContext;

  sdkConfig: WormholeConfig;
  sdkConverter: SDKConverter;

  network: Network;

  // SDkv2
  v2Network: N;
  v2Wormhole?: WormholeV2<N>; // cache

  isMainnet: boolean;

  // External resources
  rpcs: ChainResourceMap;
  rest: ChainResourceMap;
  graphql: ChainResourceMap;
  wormholeApi: string;
  wormholeRpcHosts: string[];
  coinGeckoApiKey?: string;

  // White lists
  chains: ChainsConfig;
  chainsArr: ChainConfig[];
  tokens: TokensConfig;
  tokensArr: TokenConfig[];
  wrappedTokenAddressCache: WrappedTokenAddressCache;

  gasEstimates: GasEstimates;
  routes: string[];

  // Callbacks
  triggerEvent: WormholeConnectEventHandler;
  validateTransfer?: ValidateTransferHandler;

  // UI details
  cta?: {
    text: string;
    link: string;
  };
  explorer?: ExplorerConfig;
  attestUrl: string;
  bridgeDefaults?: BridgeDefaults;
  cctpWarning: string;
  pageHeader?: string | PageHeader;
  pageSubHeader?: string;
  menu: MenuEntry[];
  searchTx?: SearchTxConfig;
  moreTokens?: MoreTokenConfig;
  moreNetworks?: MoreChainConfig;
  partnerLogo?: string;
  walletConnectProjectId?: string;
  showHamburgerMenu: boolean;
  previewMode?: boolean; // Disables making transfers

  // Route settings
  ethBridgeMaxAmount: number;
  wstETHBridgeMaxAmount: number;

  // NTT config
  nttGroups: NttGroups;
  guardianSet: GuardianSetData;

  // Redesign flag
  useRedesign?: boolean;
}

export type ExplorerConfig = {
  href: string;
  label?: string;
  target?: '_blank' | '_self';
};

export type PageHeader = {
  text: string;
  align: Alignment;
};

export type SearchTxConfig = {
  txHash?: string;
  chainName?: string;
};

export type MoreTokenConfig = {
  label: string;
  href: string;
  target?: '_blank' | '_self';
};

export type MoreChainConfig = {
  href: string;
  target?: '_blank' | '_self';
  description: string;
  networks: MoreChainDefinition[];
};

export type MoreChainDefinition = {
  icon: string;
  href?: string;
  label: string;
  name?: string;
  description?: string;
  target?: '_blank' | '_self';
  showOpenInNewIcon?: boolean;
};

type DecimalsMap = Partial<Record<Context, number>> & {
  default: number;
};

export type TokenConfig = {
  key: string;
  symbol: string;
  nativeChain: ChainName;
  icon: Icon | string;
  tokenId?: TokenId; // if no token id, it is the native token
  coinGeckoId: string;
  color?: string;
  decimals: DecimalsMap;
  wrappedAsset?: string;
  displayName?: string;
  foreignAssets?: {
    [chainName in ChainName]?: {
      address: string;
      decimals: number;
    };
  };
};

export type TokensConfig = { [key: string]: TokenConfig };

export interface ChainConfig extends BaseChainConfig {
  displayName: string;
  explorerUrl: string;
  explorerName: string;
  gasToken: string;
  chainId: number | string;
  icon: Icon;
  maxBlockSearch: number;
  automaticRelayer?: boolean;
}

export type ChainsConfig = {
  [chain in ChainName]?: ChainConfig;
};

export type GasEstimatesByOperation = {
  sendToken?: number;
  sendNative?: number;
  claim?: number;
};

export type GasEstimateOptions = keyof GasEstimatesByOperation;

export type GasEstimates = {
  [chain in ChainName]?: {
    [route in Route]?: GasEstimatesByOperation;
  };
};

export type RpcMapping = { [chain in ChainName]?: string };

export type GuardianSetData = {
  index: number;
  keys: string[];
};

export type NetworkData = {
  chains: ChainsConfig;
  tokens: TokensConfig;
  gasEstimates: GasEstimates;
  rpcs: RpcMapping;
  rest: RpcMapping;
  graphql: RpcMapping;
  nttGroups: NttGroups;
  guardianSet: GuardianSetData;
};

export interface MenuEntry {
  label: string;
  href: string;
  target?: string;
  order?: number;
}

export type NttTransceiverConfig = {
  address: string;
  type: 'wormhole'; // only wormhole is supported for now
};

export type NttManagerConfig = {
  chainName: ChainName;
  address: string;
  tokenKey: string; // token key for the token this NTT manager has configured
  transceivers: NttTransceiverConfig[];
  solanaQuoter?: string;
};

export type NttGroup = {
  nttManagers: NttManagerConfig[];
};

export type NttGroups = { [key: string]: NttGroup };

// Token bridge foreign asset cache
// Used in utils/sdkv2.ts

type ForeignAssets<C extends ChainV2> = Record<string, TokenAddressV2<C>>;

export class WrappedTokenAddressCache {
  caches: Partial<Record<ChainV2, ForeignAssets<ChainV2>>>;

  constructor(tokens: TokensConfig, converter: SDKConverter) {
    this.caches = {};

    // Pre-populate cache with values from built-in config
    for (const key in tokens) {
      const token = tokens[key];

      if (token.foreignAssets) {
        for (const chain in token.foreignAssets) {
          const foreignAsset = tokens[key].foreignAssets![chain];
          const chainV2 = converter.toChainV2(chain as ChainName);
          const addr = WormholeV2.parseAddress(chainV2, foreignAsset.address);
          this.set(key, chainV2, addr);
        }
      }

      // Cache it on its native chain too
      if (token.tokenId) {
        try {
          const nativeChainV2 = converter.toChainV2(token.nativeChain);
          this.set(
            key,
            nativeChainV2,
            WormholeV2.parseAddress(nativeChainV2, token.tokenId.address),
          );
        } catch (e) {
          console.error(`Error caching foreign asset`, token.tokenId, e);
        }
      }
    }
  }

  get<C extends ChainV2>(tokenKey: string, chain: C): TokenAddressV2<C> | null {
    const chainCache = this.caches[chain] as ForeignAssets<C>;
    if (!chainCache) return null;
    return chainCache[tokenKey] || null;
  }

  set<C extends ChainV2>(
    tokenKey: string,
    chain: C,
    foreignAsset: TokenAddressV2<C>,
  ) {
    if (!this.caches[chain]) this.caches[chain] = {};
    const chainCache = this.caches[chain]!;
    chainCache[tokenKey] = foreignAsset;
  }
}

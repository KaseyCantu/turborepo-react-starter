// Third Party
import getConfig from 'next/config';

// Data

// Utils

// UI

/** Only available on the Server */
// type ServerRuntimeConfig = {}

/** Available on both the Client and the Server */
type PublicRuntimeConfig = {
  canonicalUrl: string;
};

type Config = {
  // serverRuntimeConfig: ServerRuntimeConfig;
  publicRuntimeConfig: PublicRuntimeConfig;
};

type GetConfig = () => Config;

export default getConfig as GetConfig;


export interface ClientItem {
  clientId: string;
  clientSecret: string;
  resourceIds: string;
  scope: string;
  authorizedGrantTypes: string;
  webServerRedirectUri?: any;
  authorities?: any;
  accessTokenValidity: number;
  refreshTokenValidity: number;
  additionalInformation?: any;
  autoapprove: string;
}


export interface ClientFormData {
  authorizedGrantTypes: string;
  clientId: string;
  clientSecret: string;
  accessTokenValidity: string;
  refreshTokenValidity: string;
  webServerRedirectUri: string;
  authorities: string;
  additionalInformation: string;
  autoapprove: string;
  scope: string;
}

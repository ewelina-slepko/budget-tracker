export interface Source {
  id: number;
  name: string;
  isEditMode: boolean;
}

export interface NewSourceRequest {
  name: string;
  amount: number;
  uid: string;
}

export interface WalletDto extends NewSourceRequest {
  id: string;
}

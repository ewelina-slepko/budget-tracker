export interface Source {
  id: number;
  name: string;
  isEditMode: boolean;
}

export interface WalletDto {
  name: string;
  amount: number;
  uid: string;
}

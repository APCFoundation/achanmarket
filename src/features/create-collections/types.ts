import { Dispatch, SetStateAction } from "react";

export type FormState = {
  selectedChain: string;
  name: string;
  symbol: string;
  description: string;
  mintPrice: number | "";
  royaltyFee: number | "";
  maxSupply: number | "";
  limitPerWallet: number | "";
  collectionFile?: File | null;
  artType: "same" | "unique";
  artworkFile: File | null;
};

export type FieldsProps = {
  name: string;
  type?: string;
  value?: any;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setForm?: Dispatch<SetStateAction<FormState>>;
  id: string;
};

export type DescriptionFieldsProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export type CollectionSectionProps = {
  setCollectionFile?: (file: File | null) => void;
  removeCollectionFile: () => void;
  onDropCollection: (acceptedFiles: File[]) => void;
  collectionFile: File | null | undefined;
};

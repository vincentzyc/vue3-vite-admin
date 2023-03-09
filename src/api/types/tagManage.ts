interface ListLabelChildren {
  id: number;
  name: string;
  type: string;
  children: ListLabelChildren;
}

export interface ListLabel {
  id: number;
  name: string;
  type: string;
  children: ListLabelChildren[];
}

export type AddLabel = boolean;
export type GetSubProductList = string[];
export type GetSubtypeList = string[];

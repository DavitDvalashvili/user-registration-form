export type positionsState = {
  loading: boolean;
  positions: position[];
  error: string;
  getPositions: () => Promise<void>;
};

export type position = {
  id: string;
  name: string;
};

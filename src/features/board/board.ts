import Disk from "../../domain/disk";

export interface Board {
  disks: (Disk|null)[];
}

export const initialBoard: () => Board = () => ({
  disks: Array<Disk|null>(9).fill(null)
});

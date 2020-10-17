import Mark from "../../domain/mark";

export interface Board {
  marks: (Mark|null)[];
}

export const initialBoard: () => Board = () => ({
  marks: Array<Mark|null>(9).fill(null)
});

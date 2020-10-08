import Player from "../../domain/player";
import Disk from "../../domain/disk";

export interface Move {
  readonly player: Player;
  readonly disk: Disk;
  readonly position: number;
}



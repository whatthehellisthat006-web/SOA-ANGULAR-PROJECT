import { Compagnie } from './compagnie.model';

export class Vol {
  idVol!: number;
  numero!: string;
  origine!: string;
  destination!: string;
  dateDepart!: string | Date;
  dateArrivee!: string | Date;
  compagnie?: Compagnie;
}

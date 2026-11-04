import { Compagnie } from './compagnie.model';

export class CompagnieWrapper {
  _embedded!: { compagnies: Compagnie[] };
}

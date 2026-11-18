import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Vol } from '../model/vol.model';
import { VolService } from '../services/vol';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-vols',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink],
  templateUrl: './vols.html',
  styles: ``,
})
export class Vols implements OnInit {
  vols: Vol[] = [];

  constructor(
    private volService: VolService,
    public authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.chargerVols();
  }

  chargerVols(): void {
    this.volService.listeVols().subscribe({
      next: vols => {
        console.log(vols);
        this.vols = vols;
        this.cdr.markForCheck();
      },
      error: err => {
        console.error('Erreur chargement vols', err);
      }
    });
  }

  supprimerVol(v: Vol) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf) {
      this.volService.supprimerVol(v.idVol).subscribe(() => {
        console.log('vol supprimé');
        this.chargerVols();
      });
    }
  }
}

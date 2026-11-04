import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Vol } from '../model/vol.model';
import { VolService } from '../services/vol';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-vols',
  imports: [DatePipe, RouterLink],
  templateUrl: './vols.html',
  styles: ``,
})
export class Vols implements OnInit {
  vols!: Vol[];

  constructor(
    private volService: VolService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.chargerVols();
  }

  chargerVols(): void {
    this.volService.listeVols().subscribe(vols => {
      console.log(vols);
      this.vols = vols;
    });
  }

  supprimerVol(v: Vol) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf) {
      this.volService.supprimerVol(v.idVol).subscribe(() => {
        console.log("vol supprimé");
        this.chargerVols();
      });
    }
  }
}

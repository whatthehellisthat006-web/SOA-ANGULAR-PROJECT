import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vol } from '../model/vol.model';
import { Compagnie } from '../model/compagnie.model';
import { VolService } from '../services/vol';

@Component({
  selector: 'app-update-vol',
  standalone: true,
  imports: [FormsModule, CommonModule, DatePipe],
  templateUrl: './update-vol.html',
  styles: ``,
})
export class UpdateVol implements OnInit {
  currentVol = new Vol();
  compagnies: Compagnie[] = [];
  updatedCompagnieId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private volService: VolService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.volService.listeCompagnies().subscribe(cats => {
      console.log(cats);
      this.compagnies = cats._embedded.compagnies;
      this.cdr.markForCheck();
    });

    this.volService.consulterVol(this.activatedRoute.snapshot.params['id']).subscribe({
      next: vol => {
        this.currentVol = vol;
        this.updatedCompagnieId = this.currentVol.compagnie ? this.currentVol.compagnie.idCompagnie : 0;
        this.cdr.markForCheck();
      },
      error: err => {
        console.error('Erreur chargement vol - Statut:', err.status, err.message);
      }
    });
  }

  updateVol(): void {
    if (!this.currentVol.idVol) {
      this.router.navigate(['/vols']);
      return;
    }
    if (this.updatedCompagnieId) {
      const selectedComp = this.compagnies.find(comp => comp.idCompagnie == this.updatedCompagnieId);
      this.currentVol.compagnie = selectedComp || ({ idCompagnie: Number(this.updatedCompagnieId) } as Compagnie);
    }
    this.volService.updateVol(this.currentVol).subscribe({
      next: vol => {
        this.router.navigate(['/vols']);
      },
      error: err => {
        console.error('Erreur modification vol - Statut HTTP:', err.status, 'Message:', err.error || err.message);
      }
    });
  }
}

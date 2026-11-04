import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vol } from '../model/vol.model';
import { Compagnie } from '../model/compagnie.model';
import { VolService } from '../services/vol';

@Component({
  selector: 'app-update-vol',
  imports: [FormsModule, CommonModule, DatePipe],
  templateUrl: './update-vol.html',
  styles: ``,
})
export class UpdateVol implements OnInit {
  currentVol = new Vol();
  compagnies!: Compagnie[];
  updatedCompagnieId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private volService: VolService
  ) {}

  ngOnInit(): void {
    this.volService.listeCompagnies().subscribe(cats => {
      console.log(cats);
      this.compagnies = cats._embedded.compagnies;
    });

    this.volService.consulterVol(this.activatedRoute.snapshot.params['id']).subscribe(vol => {
      this.currentVol = vol;
      this.updatedCompagnieId = this.currentVol.compagnie ? this.currentVol.compagnie.idCompagnie : 0;
    });
  }

  updateVol(): void {
    this.currentVol.compagnie = this.compagnies.find(comp => comp.idCompagnie == this.updatedCompagnieId)!;
    this.volService.updateVol(this.currentVol).subscribe(vol => {
      console.log(vol);
      this.router.navigate(['vols']);
    });
  }
}

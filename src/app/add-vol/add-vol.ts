import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Vol } from '../model/vol.model';
import { Compagnie } from '../model/compagnie.model';
import { VolService } from '../services/vol';

@Component({
  selector: 'app-add-vol',
  imports: [FormsModule],
  templateUrl: './add-vol.html',
  styles: ``,
})
export class AddVol implements OnInit {
  newVol = new Vol();
  compagnies!: Compagnie[];
  newIdCompagnie!: number;
  newCompagnie!: Compagnie;

  constructor(
    private volService: VolService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.volService.listeCompagnies().subscribe(cats => {
      console.log(cats);
      this.compagnies = cats._embedded.compagnies;
      if (this.compagnies && this.compagnies.length > 0) {
        this.newIdCompagnie = this.compagnies[0].idCompagnie;
      }
    });
  }

  addVol(): void {
    const selectedCompagnie = this.compagnies.find(comp => comp.idCompagnie == this.newIdCompagnie);
    if (selectedCompagnie) {
      this.newVol.compagnie = selectedCompagnie;
    }
    this.volService.ajouterVol(this.newVol).subscribe(vol => {
      console.log(vol);
      this.router.navigate(['vols']);
    });
  }
}

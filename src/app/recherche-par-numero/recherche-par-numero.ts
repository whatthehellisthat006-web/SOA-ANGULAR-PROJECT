import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Vol } from '../model/vol.model';
import { VolService } from '../services/vol';
import { SearchFilterPipe } from '../pipes/search-filter-pipe';

@Component({
  selector: 'app-recherche-par-numero',
  imports: [FormsModule, CommonModule, DatePipe, SearchFilterPipe],
  templateUrl: './recherche-par-numero.html',
  styles: ``,
})
export class RechercheParNumero implements OnInit {
  searchTerm: string = '';
  vols!: Vol[];

  constructor(private volService: VolService) {}

  ngOnInit(): void {
    this.volService.listeVols().subscribe(vols => {
      console.log(vols);
      this.vols = vols;
    });
  }
}

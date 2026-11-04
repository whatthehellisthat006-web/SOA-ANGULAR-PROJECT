import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Compagnie } from '../model/compagnie.model';

@Component({
  selector: 'app-update-compagnie',
  imports: [FormsModule],
  templateUrl: './update-compagnie.html',
  styles: ``,
})
export class UpdateCompagnie implements OnInit {
  @Input() compagnie!: Compagnie;
  @Input() ajout!: boolean;
  @Output() compagnieUpdated = new EventEmitter<Compagnie>();

  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateCompagnie ", this.compagnie);
  }

  saveCompagnie(): void {
    this.compagnieUpdated.emit(this.compagnie);
  }
}

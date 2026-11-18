import { Pipe, PipeTransform } from '@angular/core';
import { Vol } from '../model/vol.model';

@Pipe({
  name: 'searchFilter',
  standalone: true
})
export class SearchFilterPipe implements PipeTransform {

  transform(list: Vol[], filterText: string): Vol[] {
    if (!list) return [];
    if (!filterText) return list;
    const text = filterText.toLowerCase();
    return list.filter(item =>
      (item.numero ?? '').toLowerCase().includes(text)
    );
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../core/models/product.interface';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(arr: Product[], searchInput: string): Product[] {
    return arr.filter((product) =>
      product.title.toLowerCase().includes(searchInput.toLowerCase())
    );
  }
}

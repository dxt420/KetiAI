import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SearchPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'search',
  pure: true
})
export class SearchPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, args?: any): any {

    // Remove the duplicate elements
    let uniqueArray = value.filter(function (el, index, array) { 
      return array.indexOf (el) == index;
    });

    return uniqueArray;
  }
}

import { compileNgModuleDeclarationExpression } from '@angular/compiler/src/render3/r3_module_compiler';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mostRecentFirst'
})
export class MostRecentFirstPipe implements PipeTransform {
  private compare(a: { createdOnA: any; },b: { createdOnA: any; }){
    const createdOnA = a.createdOnA;
    const createdOnB = b.createdOnA;

    let conparison = 1;
    if(createdOnA > createdOnB){
      conparison = -1; 
    }
    return conparison;
  }

  transform(reviews: any[]): any[] {
    if(reviews && reviews.length){
      return reviews.sort(this.compare);
    } 

    return null;
  }
  

}

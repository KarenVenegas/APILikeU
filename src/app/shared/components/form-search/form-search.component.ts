import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/* Creación del input*/
@Component({
  selector: 'app-form-search',
  template: `
    <input class="input"
    #inputSearch
    autofocus
    type="text"
    class="form-control-lg"
    placeholder="Search......."
    (keyup)="onSearch(inputSearch.value)"
    />
    `,
  styles: ['input {width:100%; background-color: white;}'],
})
export class FormSearchComponent implements OnInit {
  constructor(private router:Router){}

  ngOnInit(): void{}

/*Recibe valor del input y muestra los resultados de la busqueda */
  onSearch(value:string){
    if(value && value.length>3){
      this.router.navigate(['./character-list'],{
        queryParams:{q: value},
      }
      );
    }else{
      this.router.navigate(['./home']);

    }
  }
}

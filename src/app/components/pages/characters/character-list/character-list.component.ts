import { Component, HostListener, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';

import { catchError, filter, of, take } from 'rxjs';

import { Character } from '@app/shared/interface/character.interface';
import { CharacterService } from '@app/shared/services/character.service';
import { DOCUMENT } from '@angular/common';

type RequestInfo = {next: string;};
@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})

export class CharacterListComponent  implements OnInit{
  showPagination = true;
  characters:Character[] =[];
  info: RequestInfo = {next: ''};
  errorMessage: string = '';
  page = 1;
  pageSize=20;
  showButton = true;


  private pageNum=1;
  private query: string ='';
  private scrollHeight = 500;

  constructor(
    @Inject (DOCUMENT) private document:Document,
    private characterSvc:CharacterService,
    private route: ActivatedRoute,
    private router: Router){
      this.onUrlChanged();
    }


  ngOnInit():void{
    this.getCharactersByQuery();
  }


  /*Trae los personajes*/
  private getDataFromService(): void {
    this.characterSvc
      .searchCharacters(this.query, this.pageNum)
      .pipe(
        catchError((error) => {
          if (error.status === 404) {
            console.log('No se encontró el recurso solicitado');
            this.errorMessage = 'No hay resultados para su búsqueda';
          } else {
            console.log('Ocurrió un error al realizar la solicitud', error);
          }
          return of(null);
        })
      )
      .subscribe((res: any) => {
        if (res?.results?.length) {
          const { info, results } = res;
          // limpiar arreglo de personajes antes de agregar los nuevos resultados
          this.characters = [];
          this.characters = [...this.characters, ...results];
          this.info = info;
          this.showPagination = true;
        }else{
          this.showPagination = false;
        }
      });
  }

    /*Ruta de busqueda*/
    private getCharactersByQuery() :void{
    this.route.queryParamMap.pipe(take(1)).subscribe((params: ParamMap) => {
        this.query = params.get('q') ?? '';
        this.getDataFromService();
      });
  }
    /*Cambios en URL*/
    private onUrlChanged(): void {
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          this.characters = [];
          this.pageNum = 1;
          this.getCharactersByQuery();
        });
    }

    nextPage(): void {
      if(this.page <42){
        this.page++;
        this.getCharacters();
      }
    }

    previousPage(): void {
      if (this.page > 1 ) {
        this.page--;
        this.getCharacters();
      }
    }
    getCharacters() :void{
      this.characterSvc.getCharacters(this.page, this.pageSize)
        .subscribe(data => {
          this.characters = data.results;
        });
      }

    /* Escuchar Scroll*/
    @HostListener('window:scroll')
    onWindowScroll() :void{
      const yOffset = window.pageYOffset;
      const scrollTop = this.document.documentElement.scrollTop;
      this.showButton = (yOffset || scrollTop) > this.scrollHeight;
    }

     onScrollTop() :void{
    this.document.documentElement.scrollTop = 0;
     }
}

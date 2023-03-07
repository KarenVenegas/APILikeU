import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { from, Observable } from 'rxjs';

import { Character, Episodes } from '../interface/character.interface';
import { environment } from '@enviroment/environments';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {


  constructor(private http: HttpClient) { }

  /*Filtro por query o página*/
  searchCharacters(query='', page=1){
    const filter = `${environment.baseUrlAPI}/character/?name=${query}&page=${page}`;
    return this.http.get<Character[]>(filter);
    }

  /* Recupera detalles luego de click */
  getDetails(id:number){
    return this.http.get<Character>(`${environment.baseUrlAPI}/character/${id}`);
    }

  /*Obtiene el personaje */
  getCharacters(page: number, pageSize: number): Observable<any> {
    const url = `${environment.baseUrlAPI}/character/?page=${page}&pageSize=${pageSize}`;
    return this.http.get(url)};

  /*Busca el nombre del episodio en el que aparece el personaje */
  getCharacterEpisodes(id: number): Observable<Episodes[]> {
    const url = `${environment.baseUrlAPI}/character/${id}`;
    return from(
      fetch(url)
        .then(response => response.json())
        .then(character => {
          const episodeUrls: string[] = character.episode;
          const episodePromises: Promise<Episodes>[] = episodeUrls.map(url =>
            fetch(url)
              .then(response => response.json())
              .then(episode => episode as Episodes)
          );
          return Promise.all(episodePromises);
        })
    );
  }
  /*Detalles episodio*/
  getDetailsEpisode(id:number){
    return this.http.get<Episodes>(`${environment.baseUrlAPI}/episode/${id}`);
    }
}



import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Observable, of, take } from 'rxjs';

import { CharacterService } from '@app/shared/services/character.service';
import { Character, Episodes } from '@app/shared/interface/character.interface';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent {
  character$: Observable<Character> = of({} as Character);
  episodes$: Observable<Episodes[]> = of([]);


  constructor(private route: ActivatedRoute, private characterSvc:CharacterService,private location: Location){}

  ngOnInit():void{
      this.route.params.pipe(take(1)).subscribe((params) => {
      const id = parseInt(params['id']);
      this.character$ =this.characterSvc.getDetails(id);
      this.characterSvc.getCharacterEpisodes(id)
      this.episodes$ = this.characterSvc.getCharacterEpisodes(id);
      console.log('Id de details',id);
    });

  }
  onGoBack() : void{
    this.location.back();
  }
}

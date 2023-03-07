import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of, take } from 'rxjs';
import { Character, Episodes } from '@app/shared/interface/character.interface';
import { CharacterService } from '@app/shared/services/character.service';

@Component({
  selector: 'app-character-episodes',
  templateUrl: './character-episodes.component.html',
  styleUrls: ['./character-episodes.component.scss']
})
export class CharacterEpisodesComponent implements OnInit {
  character$: Observable<Character> = of({} as Character);
  episodes$: Observable<Episodes> = of({} as Episodes);

  constructor(private route: ActivatedRoute, private router: Router, private location: Location, private characterSvc:CharacterService){}

  ngOnInit():void{
    this.route.params.pipe(take(1)).subscribe((params) => {
      const id = parseInt(params['id']);
      this.episodes$ =this.characterSvc.getDetailsEpisode(id);
      console.log('Id de details',id);
  });
}

  onGoBack() : void{
    this.location.back();
  }
}

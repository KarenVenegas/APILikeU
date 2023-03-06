import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CharacterDetailsComponent } from './character-details/character-details.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterEpisodesComponent } from './character-episodes/character-episodes.component';
import { CharacterComponent } from './character.component';

const myComponents= [CharacterDetailsComponent,CharacterListComponent,CharacterEpisodesComponent,CharacterComponent]
@NgModule({
  declarations: [...myComponents],
  imports: [CommonModule, RouterModule ],
  exports:[...myComponents]

})
export class CharactersModule { }

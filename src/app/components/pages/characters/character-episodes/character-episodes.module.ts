import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterEpisodesRoutingModule } from './character-episodes-routing.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [  ],
  imports: [
    CommonModule,
    CharacterEpisodesRoutingModule,
    RouterModule
  ]
})
export class CharacterEpisodesModule { }

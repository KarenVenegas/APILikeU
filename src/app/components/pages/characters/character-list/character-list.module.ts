import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterListRoutingModule } from './character-list-routing.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [  ],
  imports: [
    CommonModule,
    CharacterListRoutingModule,
    RouterModule
  ]
})
export class CharacterListModule { }

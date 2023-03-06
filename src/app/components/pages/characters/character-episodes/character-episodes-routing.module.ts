import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterEpisodesComponent } from './character-episodes.component';

const routes: Routes = [{ path: '', component: CharacterEpisodesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharacterEpisodesRoutingModule { }

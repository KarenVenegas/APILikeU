export interface Character {
  id: number;
  name: string;
  image: string;
  species: string;
  gender:string;
  created: string;
  status: string;
  episode: string [];
  url: string;
}
export interface Episodes{
  id: number;
  name: string;
  air_date: string;
  episode: string;
  created: string;
}


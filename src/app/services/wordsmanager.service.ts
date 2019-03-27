import { Injectable } from '@angular/core';
import { Word } from '../interfaces/word';

@Injectable({
  providedIn: 'root'
})
export class WordsmanagerService {
  private wordlist: Array<Word> = [
    {
      name: 'coche',
      definition: 'para moverte a distintos sitios',
    },
    {
      name: 'españa',
      definition: 'siempre arriba',
    },
    {
      name: 'perico',
      definition: 'mongolin',
    },
    {
      name: 'mosca',
      definition: 'vuela y da porculo',
    },
    {
      name: 'conejo',
      definition: 'bad bunny',
    },
  ];

  constructor() { }
  GetWords(nwords: number) {
    this.wordlist = this.shuffleArray(this.wordlist);
    const aux: Array<Word> = [];
    for (let i = 0; i < nwords; i++) {
       aux[i] = this.wordlist[i];
    }
    return aux;
  }
  shuffleArray(array) {
    let m = array.length, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }
}


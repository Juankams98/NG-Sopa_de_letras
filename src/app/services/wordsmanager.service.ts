import { Injectable } from '@angular/core';
import { Word } from '../interfaces/word';

@Injectable({
  providedIn: 'root'
})
export class WordsmanagerService {
  private wordlist: Array<Word> = [
    {
      name: 'teemo',
      definition: 'yordel lanza dardos',
    },
    {
      name: 'kassadin',
      definition: 'flash cada 10s',
    },
    {
      name: 'zoe',
      definition: 'bolazos oneshoot',
    },
    {
      name: 'evelynn',
      definition: 'se hace invible',
    },
    {
      name: 'draven',
      definition: 'hachas que giran',
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
    // While there remain elements to shuffle
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }
}


import { Component, OnInit } from '@angular/core';
import { WordsmanagerService } from '../services/wordsmanager.service';
import { Word } from '../interfaces/word';
import { $ } from 'protractor';

@Component({
  selector: 'app-apalabrado',
  templateUrl: './apalabrado.component.html',
  styleUrls: ['./apalabrado.component.scss']
})
export class ApalabradoComponent implements OnInit {
  numwordscapacity: Array<number> = [3, 4, 5];
  numwords: number;
  wordlist: Array<Word>;
  wordSquares: string[][];
  ncasillas: number;
  constructor(public _wordsservice: WordsmanagerService) { }
  ngOnInit() {
    // this.wordSquares = [][];
    this.numwords = 3;
    this.ncasillas = 10;
    this.wordlist = this._wordsservice.GetWords(this.numwords);
    console.log(this.wordlist);
  }
  WordsDefine() {
    this.wordlist = this._wordsservice.GetWords(this.numwords);
    this.TableRestart();
  }
  TableRestart() {
    console.log(this.wordSquares);
    for (let i = 0; i < this.ncasillas; i++) {
      for (let l = 0; l < this.ncasillas; l++) {
       this.wordSquares[i][l] = i + ', ' + l;
      }
    }
    console.log(this.wordSquares);
    //
    let tabla = '';
    for (let i = 0; i < this.ncasillas; i++) {
      tabla = tabla + '<tr>';
      for (let l = 0; l < this.ncasillas; l++) {
        tabla = tabla + '<td>0</td>';
      }
      tabla = tabla + '</tr>';
    }
    document.getElementById('wordsContainer').innerHTML = tabla;
  }
  AddWordsToTable() {

  }
}

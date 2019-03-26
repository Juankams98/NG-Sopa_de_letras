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
  wordSquares: string[][] = new Array();
  ncasillas: number;
  constructor(public _wordsservice: WordsmanagerService) { }
  ngOnInit() {
    this.wordSquares = [],[];
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
       this.wordSquares.push(["X", "X", "X", "X" , "X" ,"X","X", "X", "X", "X"] );    
    }
    console.log(this.wordSquares);
    //
    let tabla = '';
    for (let i = 0; i < this.wordSquares.length; i++) {
      tabla = tabla + '<tr>';
      for (let l = 0; l < this.wordSquares.length; l++) {
        tabla = tabla + '<td>'+ this.wordSquares[i][l] +'</td>';
      }
      tabla = tabla + '</tr>';
    }
    document.getElementById('wordsContainer').innerHTML = tabla;
  }
  AddWordsToTable() {

  }
}

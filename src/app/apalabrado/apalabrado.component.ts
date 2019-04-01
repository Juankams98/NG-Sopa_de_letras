import { Component, OnInit } from '@angular/core';
import { WordsmanagerService } from '../services/wordsmanager.service';
import { Word } from '../interfaces/word';
import { ViewEncapsulation } from '@angular/core';
import { $ } from 'protractor';
import { forEach } from '@angular/router/src/utils/collection';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-apalabrado',
  templateUrl: './apalabrado.component.html',
  styleUrls: ['./apalabrado.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ApalabradoComponent implements OnInit {
  numwordscapacity: Array<number> = [3, 4, 5];
  numwords: number;
  wordlist: Array<Word>;
  originWordSquares: string[][] = new Array();
  wordSquares: string[][] = new Array();
  abcdary: Array<string>;
  ncasillas: number;
  constructor(public _wordsservice: WordsmanagerService) { }
  ngOnInit() {
    this.abcdary = ["a", "a", "a", "a", "b", "c", "d", "e", "e", "e", "e",
      "f", "g", "h", "i", "i", "i", "i", "j", "k",
      "l", "m", "n", "ñ", "o", "o", "o", "o", "p",
      "q", "r", "s", "t", "u", "u", "u", "u", "v",
      "w", "x", "y", "z",]
    this.wordSquares = [], [];
    this.numwords = 3;
    this.ncasillas = 10;
    this.wordlist = this._wordsservice.GetWords(this.numwords);
    console.log(this.wordlist);
    this.WordsDefine()
    this.TableRestart()
  }
  WordsDefine() {
    this.wordlist = this._wordsservice.GetWords(this.numwords);
    this.TableRestart();
  }
  TableRestart() {
    document.getElementById("wordsContainer").innerHTML = `<table></table>`
    document.getElementsByTagName('table')[0].innerHTML = ``;
    this.wordSquares = [], [];
    this.originWordSquares = [], []
    console.log(this.wordSquares);
    // for (let i = 0; i < this.ncasillas; i++) {
    //   this.wordSquares.push([
    //     this.abcdary[this.randomInt(0,this.abcdary.length)], this.abcdary[this.randomInt(0,this.abcdary.length)],
    //     this.abcdary[this.randomInt(0,this.abcdary.length)], this.abcdary[this.randomInt(0,this.abcdary.length)],
    //     this.abcdary[this.randomInt(0,this.abcdary.length)], this.abcdary[this.randomInt(0,this.abcdary.length)],
    //     this.abcdary[this.randomInt(0,this.abcdary.length)], this.abcdary[this.randomInt(0,this.abcdary.length)],
    //     this.abcdary[this.randomInt(0,this.abcdary.length)], this.abcdary[this.randomInt(0,this.abcdary.length)]]);
    // }
    for (let i = 0; i < this.ncasillas; i++) {
      this.wordSquares.push([
        "X", "X",
        "X", "X",
        "X", "X",
        "X", "X",
        "X", "X"]);
    }
    for (let i = 0; i < this.ncasillas; i++) {
      this.originWordSquares.push([
        "X", "X",
        "X", "X",
        "X", "X",
        "X", "X",
        "X", "X"]);
    }
    this.wordlist.forEach(word => {
      this.AddWordToTable(word.name)
    });
    let tabla = '';
    for (let i = 0; i < this.wordSquares.length; i++) {
      tabla = tabla + '<tr>';
      for (let l = 0; l < this.wordSquares.length; l++) {
        tabla = tabla + '<td class="clickeable" id="' + (i + "" + l) + '">' + this.wordSquares[i][l].toUpperCase() + '</td>';
      }
      tabla = tabla + '</tr>';
    }
    document.getElementsByTagName('table')[0].innerHTML = tabla;

    let tdlist = document.getElementsByTagName("td");
    let selectedWord: string = "";
    let firstclick: boolean = true;
    let ncasillas = this.ncasillas;
    for (let i = 0; i < tdlist.length; i++) {
      tdlist[i].addEventListener("click", function setClickers() {
        let x: number = +tdlist[i].id[0];
        let y: number = +tdlist[i].id[1];

        console.log((x) + "," + (y));
        if (tdlist[i].style.borderColor == "red") {
          tdlist[i].style.borderColor = "whitesmoke";
          tdlist[i].removeEventListener("click", setClickers)
        }
        else {
          tdlist[i].style.borderColor = "red";
          selectedWord += tdlist[i].innerHTML.toLocaleLowerCase()
          if (firstclick) {
            for (let j = 0; j < ncasillas; j++) {
              for (let l = 0; l < ncasillas; l++) {
                const casillaux = document.getElementById(j +""+ l);
                casillaux.removeEventListener("click", setClickers)                
              }
            }
            // document.getElementById((x)+""+(y)).addEventListener("click", setClickers);
            // document.getElementById((x+1)+""+(y)).addEventListener("click", setClickers);
            // document.getElementById((x)+""+(y+1)).addEventListener("click", setClickers);
            // document.getElementById((x-1)+""+(y)).addEventListener("click", setClickers);
            // document.getElementById((x)+""+(y-1)).addEventListener("click", setClickers)
          }

          firstclick = false;
        }
      });
    }
  }
  AddWordToTable(word: string) {
    var ncasillas = this.ncasillas;
    let x: number = this.randomInt(0, ncasillas);
    let y: number = this.randomInt(0, ncasillas);
    let dir: number = this.randomInt(0, 2);
    if (dir == 0) {
      while (!this.checkLengthWord(word, x) || !this.solapeCheck(word, x, y, dir)) {
        x = this.randomInt(0, ncasillas);
        y = this.randomInt(0, ncasillas);
      }
    }
    else {
      while (!this.checkLengthWord(word, y) || !this.solapeCheck(word, x, y, dir)) {
        x = this.randomInt(0, ncasillas);
        y = this.randomInt(0, ncasillas);
      }
    }

    for (let i = 0; i < word.length; i++) {
      this.wordSquares[x][y] = word[i].toUpperCase();
      if (dir == 0) {
        x++;
      }
      else {
        y++;
      }
    }
  }
  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  checkLengthWord(word: string, dir: number) {
    let back: boolean = false;
    if (word.length < (this.ncasillas - 1) - dir) {
      back = true;
    }
    return back;
  }
  solapeCheck(word: string, x: number, y: number, dir: number) {
    let back: boolean = true;
    for (let i = 0; i < word.length; i++) {
      let letra = word[i];
      let casilla = this.wordSquares[x][y];
      let casillavieja = this.originWordSquares[x][y];
      if (letra != casilla && casilla != casillavieja) {
        back = false;
      }
      if (dir == 0) {
        x++;
      }
      else {
        y++;
      }
    }
    return back
  }
}

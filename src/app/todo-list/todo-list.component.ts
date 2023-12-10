// src/app/todo-list/todo-list.component.ts
import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { Howl } from 'howler';
import { Dialog } from 'primeng/dialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
    trigger('completeTask', [
      transition(':leave', [
        animate('300ms', style({ opacity: 0, height: '0px', margin: '0px' })),
      ]),
      transition(':enter', [
        style({ opacity: 0, height: '0px', margin: '0px' }),
        animate('300ms', style({ opacity: 1, height: '*', margin: '*' })),
      ]),
    ]),
  ],
})
export class TodoListComponent implements OnInit {
  todoItems: { text: string; completed: boolean }[] = [];
  newItem: string = '';
  clappingSound: Howl;

  displayDialog: boolean = false;
  dialogMessage: string = '';

  motivatingSentences: string[] = [
    'Believe in yourself and all that you are.',
    'Your attitude determines your direction.',
    'Success is a journey, not a destination.',
    'You are stronger than you think.',
    'Every day is a second chance.',
    'Dream big and dare to fail.',
    'The only limit is the one you set for yourself.',
    'Challenges are what make life interesting.',
    'Your potential is endless.',
    "Hard work beats talent when talent doesn't work hard.",
    'Success begins with a single step.',
    "Don't watch the clock; do what it does. Keep going.",
    'The best way to predict the future is to create it.',
    'You are the author of your own story.',
    'The only way to do great work is to love what you do.',
    "Your time is limited, so don't waste it living someone else's life.",
    'You are never too old to set another goal or to dream a new dream.',
    'Difficulties in life are intended to make us better, not bitter.',
    "Don't be afraid to give up the good to go for the great.",
    'The only person you are destined to become is the person you decide to be.',
    'Your life does not get better by chance; it gets better by change.',
    'Strive for progress, not perfection.',
    'The future belongs to those who believe in the beauty of their dreams.',
    'Your success is found in your daily routine.',
    'Keep your head high, keep your chin up, and most importantly, keep smiling.',
    'The only way to achieve the impossible is to believe it is possible.',
    "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
    "Believe you can and you're halfway there.",
    'The only place where success comes before work is in the dictionary.',
    'Every morning brings new potential, but only if you make the most of it.',
    'The secret to getting ahead is getting started.',
    "Don't count the days; make the days count.",
    'Success is not final, failure is not fatal: It is the courage to continue that counts.',
    'The only person standing in your way is you.',
    'The difference between a stumbling block and a stepping stone is how you use it.',
    "It's not whether you get knocked down, it's whether you get up.",
    'Believe in your infinite potential.',
    "Your life is your message to the world. Make sure it's inspiring.",
    "Don't wait for opportunity. Create it.",
    'The only limit to our realization of tomorrow will be our doubts of today.',
    "Dreams don't work unless you do.",
    'In the middle of difficulty lies opportunity.',
    'Your positive action combined with positive thinking results in success.',
    'Life is 10% what happens to us and 90% how we react to it.',
    'Success is not in what you have, but who you are.',
    'The only way to do great work is to love what you do.',
    "Your time is limited, so don't waste it living someone else's life.",
    'You are never too old to set another goal or to dream a new dream.',
    'Difficulties in life are intended to make us better, not bitter.',
    "Don't be afraid to give up the good to go for the great.",
    'The only person you are destined to become is the person you decide to be.',
    'Your life does not get better by chance; it gets better by change.',
    'Strive for progress, not perfection.',
    'The future belongs to those who believe in the beauty of their dreams.',
    'Your success is found in your daily routine.',
    'Keep your head high, keep your chin up, and most importantly, keep smiling.',
    'The only way to achieve the impossible is to believe it is possible.',
    "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
    "Believe you can and you're halfway there.",
    'The only place where success comes before work is in the dictionary.',
    'Every morning brings new potential, but only if you make the most of it.',
    'The secret to getting ahead is getting started.',
    "Don't count the days; make the days count.",
    'Success is not final, failure is not fatal: It is the courage to continue that counts.',
    'The only person standing in your way is you.',
    'The difference between a stumbling block and a stepping stone is how you use it.',
    "It's not whether you get knocked down, it's whether you get up.",
    'Believe in your infinite potential.',
    "Your life is your message to the world. Make sure it's inspiring.",
    "Don't wait for opportunity. Create it.",
    'The only limit to our realization of tomorrow will be our doubts of today.',
    "Dreams don't work unless you do.",
    'In the middle of difficulty lies opportunity.',
    'Your positive action combined with positive thinking results in success.',
    'Life is 10% what happens to us and 90% how we react to it.',
    'Success is not in what you have, but who you are.',
  ];

  constructor(private messageService: MessageService, private zone: NgZone) {
    this.clappingSound = new Howl({
      src: ['assets/clapping-sound.mp3'], // Replace with the actual path to your sound file
    });
  }

  ngOnInit() {}

  addTodo() {
    if (this.newItem.trim() !== '') {
      this.todoItems.push({ text: this.newItem.trim(), completed: false });
      this.newItem = '';
    }
  }

  removeTodo(index: number) {
    const removedItem = this.todoItems.splice(index, 1)[0];
    removedItem.completed = !removedItem.completed;
    if (removedItem.completed) {
      this.playClappingSound();
      this.moveCompletedTaskToEnd(removedItem);
      this.showBravoDialog();
    } else {
      this.todoItems.push(removedItem);
    }
  }

  moveCompletedTaskToEnd(removedItem: { text: string; completed: boolean }) {
    this.zone.run(() => {
      this.todoItems.push(removedItem);
    });
  }

  playClappingSound() {
    this.clappingSound.play();
  }

  showBravoDialog() {
    const randomIndex = Math.floor(
      Math.random() * this.motivatingSentences.length
    );
    this.dialogMessage = this.motivatingSentences[randomIndex];
    this.displayDialog = true;
  }

  closeBravoDialog() {
    this.displayDialog = false;
  }
}

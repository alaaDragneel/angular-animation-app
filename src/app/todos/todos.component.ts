import {Component} from '@angular/core';
import {fade, slide, todoAnimation, todosAnimation} from '../animations';
import {animate, animateChild, query, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'todos',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.css'],
    animations: [ todosAnimation, todoAnimation ]
})
export class TodosComponent {
    items: any[] = [
        'Watch My Fucking Anime',
        'Play Danganronpa Till Fall In Fucking Despair',
        'Watch Game Of Thrones',
        'Yaaay Yaaay'
    ];

    addItem(input: HTMLInputElement) {
        this.items.splice(0, 0, input.value);
        input.value = '';
    }

    removeItem(item) {
        const index = this.items.indexOf(item);
        this.items.splice(index, 1);
    }

    animationStarted($event) {
        console.log($event);
    }

    animationDone($event) {
        console.log($event);
    }
}

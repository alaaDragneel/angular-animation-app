import {
    animate, animateChild, animation, group, keyframes, query, stagger, state, style, transition, trigger,
    useAnimation
} from '@angular/animations';

/** fadeInAnimation shared animation */
export const fadeInAnimation = animation([
    style({ opacity: 0 }),
    animate('{{ duration }} {{ easing }}')
], {
    params: {
        duration: '2s',
        easing: 'ease-out'
    }
});

/** bounceOutLeftAnimation shared animation */
export const bounceOutLeftAnimation = animation(
    // timing in string consist of 'duration delay easing' can remove delay safely
    animate('0.5s ease-in', keyframes([
        style({
            offset: .2, // keyframe  offset like 20% or to from [https://github.com/daneden/animate.css/blob/master/source/bouncing_exits/bounceOutLeft.css]
            opacity: 1,
            transform: 'translateX(20px)'
        }),
        style({
            offset: 1, // keyframe  offset like 20% or to
            opacity: 0,
            transform: 'translateX(-100%)'
        }),
    ]))
);
/** Fade Animation */
export const fade = trigger('fade', [
    transition(':enter', useAnimation(fadeInAnimation)),
    transition(':leave', [
        animate(2000, style({ opacity: 0 }))
    ]),
]);

/** Slide Animation */
export const slide = trigger('slide', [
    transition(':enter', [
        style({ transform: 'translateX(-10px)' }),
        animate('0.5s ease-out')
    ]),
    transition(':leave', useAnimation(bounceOutLeftAnimation)),
]);

/** todosAnimation */
export const todosAnimation = trigger('todosAnimation', [
    transition(':enter', [
        group([ // run multi animation in parallel
            query('h1', [
                style({ transform: 'translateY(-20px)' }),
                animate(500)
            ]),
            query('@todoAnimation', stagger(500, animateChild())) // run the next animation
        ])
    ]),
]);

/** todoAnimation */
export const todoAnimation = trigger('todoAnimation', [
    transition(':enter', [
        useAnimation(fadeInAnimation, {
            params: {
                duration: '500ms'
            }
        })
    ]),
    transition(':leave', [
        style({ backgroundColor: '#e74c3c', color: 'white', outlineColor: '#e74c3c', borderColor: '#e74c3c' }),
        animate(500),
        useAnimation(bounceOutLeftAnimation)
    ]),
]);

export const expandCollapse = trigger('expandCollapse', [
    state('collapsed', style({ height: 0, paddingTop: 0, paddingBottom: 0, opacity: 0 })), // paddingTop defined in zippy.component.css .zippy-body
    // state('expanded', style({ height: '*', paddingTop: '*', paddingBottom: '*', overflow: 'hidden' })), // * mean calculate the height dynamically depending on content
    transition('collapsed => expanded', [
        animate('300ms ease-out', style({
            height: '*',
            paddingTop: '*',
            paddingBottom: '*',
        })),
        animate('1s', style({ opacity: 1 }))
    ]),
    transition('expanded => collapsed', [
        animate('300ms ease-in'),
    ]),
]);
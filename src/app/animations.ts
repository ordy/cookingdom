import { trigger, transition, query, style, animateChild, animate, group } from '@angular/animations';

const slideLeft = [
	style({ position: 'relative', overflow: 'hidden', opacity: 1 }),
	query(':enter, :leave', [
		style({
			position: 'absolute',
			top: 0,
			right: 0,
			width: '100%',
		}),
	]),
	query(':enter', [style({ right: '-100%', opacity: 0 })]),
	query(':leave', animateChild()),
	group([
		query(':leave', [animate('500ms ease-out', style({ right: '100%', opacity: 0 }))]),
		query(':enter', [animate('600ms ease-out', style({ right: '0%', opacity: 1 }))]),
	]),
];
const slideRight = [
	style({ position: 'relative', overflow: 'hidden', opacity: 1 }),
	query(':enter, :leave', [
		style({
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
		}),
	]),
	query(':enter', [style({ left: '-100%', opacity: 0 })]),
	query(':leave', animateChild()),
	group([
		query(':leave', [animate('500ms ease-out', style({ left: '100%', opacity: 0 }))]),
		query(':enter', [animate('600ms ease-out', style({ left: '0%', opacity: 1 }))]),
	]),
];
const slideDown = [
	style({ position: 'relative', overflow: 'hidden', opacity: 1 }),
	query(':enter, :leave', [
		style({
			position: 'absolute',
			top: 0,
			width: '100%',
			height: '100%',
		}),
	]),
	query(':enter', [style({ top: '-100%', opacity: 0 })]),
	query(':leave', animateChild()),
	group([
		query(':leave', [animate('500ms ease-out', style({ top: '100%', opacity: 0 }))]),
		query(':enter', [animate('600ms ease-out', style({ top: 0, opacity: 1 }))]),
	]),
];
const slideUp = [
	style({ position: 'relative', overflow: 'hidden', opacity: 1 }),
	query(':enter, :leave', [
		style({
			position: 'absolute',
			top: 0,
			width: '100%',
			height: '100%',
		}),
	]),
	query(':enter', [style({ top: '100%', opacity: 0 })]),
	query(':leave', animateChild()),
	group([
		query(':leave', [animate('500ms ease-out', style({ top: '-100%', opacity: 0 }))]),
		query(':enter', [animate('600ms ease-out', style({ top: '0%', opacity: 1 }))]),
	]),
];

export const slideInAnimation = trigger('routeAnimations', [
	transition('ingredientsPage => recipesPage', slideLeft),
	transition('ingredientsPage => inventoryPage', slideLeft),
	transition('recipesPage => ingredientsPage', slideRight),
	transition('recipesPage => inventoryPage', slideLeft),
	transition('inventoryPage => ingredientsPage', slideRight),
	transition('inventoryPage => recipesPage', slideRight),
	transition('* => privacyPage', slideUp),
	transition('privacyPage => *', slideDown),
	transition('* <=> *', [
		style({ position: 'relative', opacity: 1 }),
		query(
			':enter, :leave',
			[
				style({
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
				}),
			],
			{ optional: true }
		),
		query(':enter', [style({ opacity: 0 })], { optional: true }),
		query(':leave', animateChild(), { optional: true }),
		group([
			query(':leave', [animate('500ms ease-in', style({ opacity: 0 }))], { optional: true }),
			query(':enter', [animate('500ms ease-in', style({ opacity: 1 }))], { optional: true }),
		]),
	]),
]);

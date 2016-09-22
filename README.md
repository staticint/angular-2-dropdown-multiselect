# Angular 2 Dropdown Multiselect for Bootstrap CSS

Updated to work with RC6 !

Customizable dropdown multiselect in Angular 2, TypeScript with bootstrap css.

See demo: http://softsimon.github.io/angular-2-dropdown-multiselect

## Dependencies
* Bootstrap CSS 3
* Font Awesome *(only with search box and checkbox mode)*

## Quick start options

* [Download the latest release](https://github.com/softsimon/angular-2-dropdown-multiselect/archive/v0.2.0.zip).
* Clone the repo: `git clone https://github.com/softsimon/angular-2-dropdown-multiselect.git`.
* Install with [Bower](http://bower.io): `bower install angular-2-dropdown-multiselect --save`.
* Install with [npm](https://www.npmjs.com): `npm install angular-2-dropdown-multiselect --save-dev`.

## Usage

Import `MultiselectDropdownModule` into your @NgModule.

```js
import { IMultiSelectOption } from 'multiselect-dropdown';

export class MyClass {
    private selectedOptions: number[];
    private myOptions: IMultiSelectOption[] = [
        { id: 1, name: 'Option 1' },
        { id: 2, name: 'Option 2' },
    ];
}
```

In your template, use the component directive:

```html
<ss-multiselect-dropdown [options]="myOptions" [(ngModel)]="selectedOptions" (ngModelChange)="onChange($event)"></ss-multiselect-dropdown>
```

## Customize

Import the IMultiSelectSettings and IMultiSelectTexts interfaces to enable/override settings and text strings:
```js
private selectedOptions: Array<IMultiSelectOption> = Array<IMultiSelectOption>({ id: 1, name: 'Option 1' },
        { id: 2, name: 'Option 2' }); // Default selection

private mySettings: IMultiSelectSettings = {
    pullRight: false,
    enableSearch: false,
    checkedStyle: 'checkboxes',
    buttonClasses: 'btn btn-default',
    selectionLimit: 0,
    closeOnSelect: false,
    showCheckAll: false,
    showUncheckAll: false,
    dynamicTitleMaxItems: 3,
    maxHeight: '300px',
};

private myTexts: IMultiSelectTexts = {
    checkAll: 'Check all',
    uncheckAll: 'Uncheck all',
    checked: 'checked',
    checkedPlural: 'checked',
    searchPlaceholder: 'Search...',
    defaultTitle: 'Select',
};
```

```html
<ss-multiselect-dropdown [options]="myOptions" [texts]="myTexts" [settings]="mySettings" [(ngModel)]="selectedOptions"></ss-multiselect-dropdown>
```

## Developing

Pull requests are welcome!

## License

[MIT]

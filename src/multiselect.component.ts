/*
 * Angular 2 Dropdown Multiselect for Bootstrap
 * Current version: 0.2.0
 * 
 * Simon Lindh
 * https://github.com/softsimon/angular-2-dropdown-multiselect
 */

import { Component, Pipe, OnInit, DoCheck, HostListener, Input, ElementRef, Output, EventEmitter, IterableDiffers } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';



@Component({
    selector: 'ss-multiselect-dropdown',
    styleUrls: ['multiselect.scss'],
    templateUrl: 'multiselect.module.ts',
    inputs: [
        'options',
        'settings',
        'texts',
    ],
    outputs: [
        'selectionLimitReached'
    ],
})
export class MultiselectDropdown implements OnInit, DoCheck, ControlValueAccessor {

    options: Array<IMultiSelectOption>;
    settings: IMultiSelectSettings;
    texts: IMultiSelectTexts;
    selectionLimitReached = new EventEmitter();
    @HostListener('document: click', ['$event.target'])
    onClick(target) {
        let parentFound = false;
        while (target !== null && !parentFound) {
            if (target === this.element.nativeElement) {
                parentFound = true;
            }
            target = target.parentElement;
        }
        if (!parentFound) {
            this.isVisible = false;
        }
    }

    constructor(protected element: ElementRef, protected differs: IterableDiffers) {
        this.differ = differs.find([]).create(null);
    }

    protected onModelChange: Function = (_: any) => { };
    protected onModelTouched: Function = () => { };    
    protected model: Array<IMultiSelectOption>;
    protected title: string;
    protected differ: any;
    protected numSelected: number = 0;
    protected isVisible: boolean = false;
    protected searchFilterText: string = '';
    protected defaultSettings: IMultiSelectSettings = {
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
    protected defaultTexts: IMultiSelectTexts = {
        checkAll: 'Check all',
        uncheckAll: 'Uncheck all',
        checked: 'checked',
        checkedPlural: 'checked',
        searchPlaceholder: 'Search...',
        defaultTitle: 'Select',
    };

    ngOnInit() {
        this.settings = Object.assign(this.defaultSettings, this.settings);
        this.texts = Object.assign(this.defaultTexts, this.texts);
    }

    writeValue(value: any): void {
        if (value !== undefined) {
            this.model = value;
        }
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    ngDoCheck() {
        let changes = this.differ.diff(this.model);
        if (changes) {
            this.updateNumSelected();
            this.updateTitle();
        }
    }

    clearSearch() {
        this.searchFilterText = '';
    }

    toggleDropdown() {
        this.isVisible = !this.isVisible;
    }

    indexOf(option: IMultiSelectOption): number {
        if (!this.model) {
            return -1;
        }

        for (var i = 0; i < this.model.length; i++) {
            if (this.model[i]["id"] == option.id) {
                return i;
            }
        }
        return -1;
    }

    isSelected(option: IMultiSelectOption): boolean {
        return this.model && this.indexOf(option) > -1;
    }

    setSelected(event: Event, option: IMultiSelectOption) {
        if (!this.model) return;        
        var index = this.indexOf(option);
        if (index > -1) {
            this.model.splice(index, 1);
        } else {
            if (this.settings.selectionLimit === 0 || this.model.length < this.settings.selectionLimit) {
                this.model.push(option);
            } else {
                this.selectionLimitReached.emit(this.model.length);
                return;
            }
        }
        if (this.settings.closeOnSelect) {
            this.toggleDropdown();
        }
        this.onModelChange(this.model);
    }

    updateNumSelected() {
        this.numSelected = this.model && this.model.length || 0;
    }

    updateTitle() {
        if (this.numSelected === 0) {
            this.title = this.texts.defaultTitle;
        } else if (this.settings.dynamicTitleMaxItems >= this.numSelected) {
            this.title = this.options
                .filter((option: IMultiSelectOption) => this.model && this.indexOf(option) > -1)

                .map((option: IMultiSelectOption) => option.name)
                .join(', ');
        } else {
            this.title = this.numSelected + ' ' + (this.numSelected === 1 ? this.texts.checked : this.texts.checkedPlural);
        }
    }

    checkAll() {
        this.searchFilterText = '';
        this.model = this.options.map(option => option);
        this.onModelChange(this.model);

    }

    uncheckAll() {
        this.searchFilterText = '';
        this.model = [];
        this.onModelChange(this.model);
    }
}

export interface IMultiSelectOption {
    id: string|number;
    name: string;
}

export interface IMultiSelectSettings {
    pullRight?: boolean;
    enableSearch?: boolean;
    checkedStyle?: 'checkboxes' | 'glyphicon';
    buttonClasses?: string;
    selectionLimit?: number;
    closeOnSelect?: boolean;
    showCheckAll?: boolean;
    showUncheckAll?: boolean;
    dynamicTitleMaxItems?: number;
    maxHeight?: string;
}

export interface IMultiSelectTexts {
    checkAll?: string;
    uncheckAll?: string;
    checked?: string;
    checkedPlural?: string;
    searchPlaceholder?: string;
    defaultTitle?: string;
}

@Pipe({
    name: 'searchFilter'
})
export class MultiSelectSearchFilter {
    transform(options: Array<IMultiSelectOption>, args: string): Array<IMultiSelectOption> {
        return options.filter((option: IMultiSelectOption) => option.name.toLowerCase().indexOf((args || '').toLowerCase()) > -1);
    }
}

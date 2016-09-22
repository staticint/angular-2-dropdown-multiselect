import { NgModule } from "@angular/core/src/metadata/ng_module";
import { CommonModule } from "@angular/common";
import { FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";
import { MultiselectDropdown, MultiSelectSearchFilter, IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from "./multiselect.component";
import { forwardRef } from "@angular/core";

const MULTISELECT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiselectDropdown),
    multi: true
};

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        MultiselectDropdown,
        IMultiSelectOption,
        IMultiSelectSettings,
        IMultiSelectTexts
    ],
    providers: [MULTISELECT_VALUE_ACCESSOR],
    declarations: [
        MultiselectDropdown,
        MultiSelectSearchFilter
    ],
})
export class MultiselectDropdownModule { }
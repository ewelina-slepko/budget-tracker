import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {formAnimation} from '../../../../../shared/animations/form-animation';
import {FilterType, TransactionsListFiltersDto} from './dtos';
import {saveDocumentWithId} from '../../../../../shared/utilities';
import {BudgetDtoWithSelection} from '../../../../shared/forms/budgets-form/dtos';
import {ApiService} from '../../../../../shared/services/api.service';
import {PanelService} from '../../../panel.service';

@Component({
  selector: 'filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss'],
  animations: formAnimation
})
export class FilterFormComponent implements OnInit {

  @Input() isFilterFormOpen: boolean;
  @Output() closeFilterFormEmitter = new EventEmitter();

  budgetsList: BudgetDtoWithSelection[];
  selectedType: FilterType;
  filterType = FilterType;

  constructor(private apiService: ApiService,
              private panelService: PanelService) {
  }

  ngOnInit() {
    this.getBudgetsList();
  }

  closeFilterForm() {
    this.closeFilterFormEmitter.emit();
  }

  saveFilter(form) {

    const transactionsListFiltersDto: TransactionsListFiltersDto = {
      date: form.date,
      amountFrom: form.from,
      amountTo: form.to,
      type: this.selectedType,
      budgets: this.budgetsList.filter(element => element.selected).map(budget => budget.id)
    };


    this.panelService.sendTransactionsListFilters(transactionsListFiltersDto);
    this.closeFilterForm();
  }

  selectType(type: FilterType) {
    this.selectedType = type;
  }

  getBudgetsList() {
    this.apiService.getBudgetsList().subscribe(res => {
      this.budgetsList = saveDocumentWithId(res).map(({selected, ...rest}) => (
        {
          selected: true,
          ...rest
        }
      ));
    });
  }

  toggleSelection(selectedBudget: BudgetDtoWithSelection) {
    this.budgetsList = this.budgetsList.map(({selected, ...rest}) => (
      {
        selected: rest.id === selectedBudget.id ? !selected : selected,
        ...rest
      }
    ));
  }
}

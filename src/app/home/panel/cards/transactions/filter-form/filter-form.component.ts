import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {formAnimation} from '../../../../../shared/animations/form-animation';
import {StandardFilter, FilterType} from './dtos';
import {saveDocumentWithId} from '../../../../../shared/utilities';
import {BudgetDtoWithSelection} from '../../../../shared/forms/budgets-form/dtos';
import {ApiService} from '../../../../../shared/services/api.service';
import {PanelService} from '../../../panel.service';
import * as moment from 'moment';
import {TransactionDto} from '../../../../shared/forms/transaction-form/dtos';

const filters = {
  date: (date: Date) => (transaction: TransactionDto): boolean =>
    moment.unix(transaction.date.seconds).format('DD/MM/YYYY') === moment(date).format('DD/MM/YYYY'),
  amountFrom: (amountFrom: number) => (transaction: TransactionDto): boolean =>
    transaction.amount >= amountFrom,
  amountTo: (amountTo: number) => (transaction: TransactionDto): boolean =>
    transaction.amount <= amountTo
};

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
    const standardFilters: StandardFilter[] = [
      ...((form.date && form.date !== '')
        ? [{name: moment(form.date).format('DD/MM/YYYY'), filterFunction: standardFiltersTemplate.date.makeFilterFunction(form.date)}]
        : []),

      ...((form.from && form.from !== '')
        ? [{name: `min ${form.from}zł`, filterFunction: standardFiltersTemplate.amountFrom.makeFilterFunction(form.from)}]
        : []),

      ...((form.to && form.to !== '')
        ? [{name: `max ${form.to}zł`, filterFunction: standardFiltersTemplate.amountTo.makeFilterFunction(form.to)}]
        : [])
    ];
    if(standardFilters.length > 0) {
      this.panelService.sendStandardTransactionsListFilters(standardFilters);
    }
    if (this.budgetsList.some(budget => !budget.selected)) {
      const budgetsFilters = this.budgetsList.filter(budget => budget.selected);
      this.panelService.sendBudgetsTransactionsListFilters(budgetsFilters);
    }
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

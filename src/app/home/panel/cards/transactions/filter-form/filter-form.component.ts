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
  date: {
    name: 'Date',
    makeFilterFunction: (date: Date) => (transaction: TransactionDto): boolean =>
      moment.unix(transaction.date.seconds).format('DD/MM/YYYY') === moment(date).format('DD/MM/YYYY')
  },
  amountFrom: {
    name: 'amountFrom',
    makeFilterFunction: (amountFrom: number) => (transaction: TransactionDto): boolean =>
      transaction.amount >= amountFrom
  },
  amountTo: {
    name: 'amountTo',
    makeFilterFunction: (amountTo: number) => (transaction: TransactionDto): boolean =>
      transaction.amount <= amountTo
  },
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
      ...((form.date && form.date !== '') ? [{
        name:  moment(form.date).format('DD/MM/YYYY'),
        filterFunction: filters.date.makeFilterFunction(form.date)
      }] : []),

      ...((form.from && form.from !== '') ? [{
        name: `min ${form.from}zł`,
        filterFunction: filters.amountFrom.makeFilterFunction(form.from)
      }] : []),

      ...((form.to && form.to !== '') ? [{
        name: `max ${form.to}zł`,
        filterFunction: filters.amountTo.makeFilterFunction(form.to)
      }] : [])
    ];

    const budgetsFilters = this.budgetsList.filter(budget => budget.selected);

    this.panelService.sendStandardFilters(standardFilters);
    this.panelService.sendBudgetsFilters(budgetsFilters);
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

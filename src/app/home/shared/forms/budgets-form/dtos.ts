import {TimestampDto} from '../../../../shared/dtos';

export interface NewBudgetRequest {
  name: string;
  amount: number;
  cycle: string;
  category: string;
  uid: string;
}


export interface BudgetDto extends Omit<NewBudgetRequest, 'date'> {
  date: TimestampDto;
  id: string;
}

export const categories = [
  {
    name: 'Rent',
    icon: 'fas fa-house-user',
    isSelected: false,
  },
  {
    name: 'Food',
    icon: 'fas fa-hamburger',
    isSelected: false
  },
  {
    name: 'Netflix',
    icon: 'fas fa-tv',
    isSelected: false
  },
  {
    name: 'Gym',
    icon: 'fas fa-dumbbell',
    isSelected: false
  },
  {
    name: 'Events',
    icon: 'fas fa-birthday-cake',
    isSelected: false
  },
  {
    name: 'Pet',
    icon: 'fas fa-fish',
    isSelected: false
  },
  {
    name: 'Charity',
    icon: 'fas fa-hand-holding-heart',
    isSelected: false
  },
  {
    name: '',
    icon: 'fas fa-plus',
    isSelected: false
  }
];

export interface CategoryDto {
  name: string;
  icon: string;
  isSelected: boolean;
}


export const cyclesDict = [
  {
    name: 'Weekly',
    isSelected: false
  },
  {
    name: 'Monthly',
    isSelected: false
  },
  {
    name: 'Yearly',
    isSelected: false
  }
];

export interface CyclesDto {
  name: string;
  isSelected: boolean;
}

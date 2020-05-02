export interface BudgetDto {
  name: string;
  amount: number;
  date: any;
  cycle: string;
  category: string;
  repeatCycle: boolean;
  uid: string;
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

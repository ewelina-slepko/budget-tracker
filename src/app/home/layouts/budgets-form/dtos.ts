export const categories = [
  {
    name: 'Rent',
    isSelected: false
  },
  {
    name: 'Food',
    isSelected: false
  },
  {
    name: 'Netflix',
    isSelected: false
  },
  {
    name: 'Gym',
    isSelected: false
  },
  {
    name: 'Events',
    isSelected: false
  },
  {
    name: 'Pet',
    isSelected: false
  },
  {
    name: 'Charity',
    isSelected: false
  }
];

export interface CategoryDto {
  name: string;
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

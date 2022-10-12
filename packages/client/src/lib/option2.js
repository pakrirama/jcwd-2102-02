export const sortOptions = [
  {
    value: 'relevance',
    label: 'Relevance',
    order: '',
    orderby: '',
  },
  {
    value: 'total_paymentdesc',
    label: 'Highest total_payment',
    order: 'total_payment',
    orderby: 'DESC',
  },
  {
    value: 'total_paymenteasc',
    label: 'Lowest total_payment',
    order: 'total_payment',
    orderby: 'ASC',
  },
  {
    value: 'createdAtdesc',
    label: 'dateDown',
    order: 'createdAt',
    orderby: 'DESC',
  },
  {
    value: 'createdAtasc',
    label: 'dateUp',
    order: 'createdAt',
    orderby: 'ASC',
  },

  { value: 'nameasc', label: 'A-Z', order: 'name', orderby: 'ASC' },
  { value: 'namedesc', label: 'Z-A', order: 'name', orderby: 'DESC' },
];

export const sortOptions = [
  {
    value: 'relevance',
    label: 'Relevance',
    order: '',
    orderby: '',
  },
  {
    value: 'pricedesc',
    label: 'Highest Price',
    order: 'DESC',
    orderby: 'selling_price',
  },
  {
    value: 'priceasc',
    label: 'Lowest Price',
    order: 'ASC',
    orderby: 'selling_price',
  },
  { value: 'nameasc', label: 'A-Z', order: 'ASC', orderby: 'name' },
  { value: 'namedesc', label: 'Z-A', order: 'DESC', orderby: 'name' },
];

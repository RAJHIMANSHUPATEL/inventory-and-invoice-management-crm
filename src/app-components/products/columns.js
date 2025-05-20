export const columns = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'price',
        header: 'Price',
        cell: info => `$${info.getValue()}`,
    },
    {
        accessorKey: 'stock',
        header: 'Stock',
    },
];

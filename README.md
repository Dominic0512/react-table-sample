# React table demo sample

## Recommend prerequisites environment
- Node version: v10.16.0 ⤴️
- Npm version: v6.9.0 ⤴️
- Yarn version: v1.12.3 ⤴️

## Getting started

Compile table component library for examples
```
  cd ~/path/to/project
  yarn install
  yarn prod
```

Go to basic example and run it
```
  cd /examples/quick-table
  yarn install
  yarn start
```

now, you can check the example on browser with url `localhost:3000`

## Basic example hint

1. If you want to ***enable/disable*** plugins, you can directly ***add/remove*** plugin property for `options` props of table component.
2. If you want to add custom theme, just follow the object sample and add it to `options` props for table component.
3. If you want to overwrite component with own custom component, you can directly assign component to be value with property name (`cell`, `headerCell`, `paginator`) below.

```
<Table
  headers={headers}
  data={data}
  options={{
    paginator: {   <--- Hint 1
      pageSize: 30
    },
    sorter: {},   <--- Hint 1
    customThemes: [  <--- Hint 2
      {
        name: 'blue',
        default: '#045678',
        secondary: '#FFFFFF'
      }
    ]
  }}
  themeMode={themeMode}
  components={
    {
      cell: CustomizeCell, <-- Hint 3
      headerCell: CustomizeHeaderCell, <--- Hint 3
      paginator: CustomizePaginator <--- Hint 3
    }
  }
/>
```

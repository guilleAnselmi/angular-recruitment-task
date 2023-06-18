export interface ListApiConfig<T> {
  filterable: boolean;
  useCustomFilter: boolean;
  filterFunction?(arg: T): boolean;
  rowsBuffer: number;
  /** If Client Side should usage all filter,sorting,etc functionallity of the gridApi, otherwise should only emit event */
  clientSide: boolean;
}

export interface ListItem<T> {
  data: T;
  filterable: boolean;
  selected: boolean;
}

export class listApi<T> {
  config!: ListApiConfig<T>;

  private _items!: ListItem<T>[]; // array of items in the list, this should be inmutable
  items!: ListItem<T>[];
  renderRows!: ListItem<T>[]; // array of items to render
  filterValue = '';
  constructor(config?: ListApiConfig<T>) {
    this.setApiConfig(config);
    this.setDataSource([]);
  }
  setApiConfig(config: ListApiConfig<T> | undefined): void {
    this.config = {
      ...this.getDefaultConfig(),
      ...config,
    };
  }

  getDefaultConfig(): ListApiConfig<T> {
    return {
      useCustomFilter: false,
      clientSide: true,
      filterable: true,
      rowsBuffer: 10000,
    };
  }

  setDataSource(dataSource: T[]): void {
    this._items = dataSource.map((item) => {
      return {
        filterable: this.config.filterable,
        selected: false,
        data: item,
      };
    });

    this.setItems(this._items);
  }

  setItems(items: ListItem<T>[]): void {
    if (this.config.filterable) {
      this.items = items.filter((item) => this.matchFilter(item));
    }

    this.setRenderItems();
  }

  setRenderItems(): void {
    this.renderRows = this.items.slice(0, this.config.rowsBuffer);
  }

  loadMoreItems(): void {
    this.renderRows.push(
      ...this.items.slice(
        this.renderRows.length,
        this.renderRows.length + this.config.rowsBuffer
      )
    );
  }

  // <---------------- FILTER ----------------->

  setFilter(filterValue: string): void {
    this.filterValue = filterValue;
  }

  /**
   * should apply filters to the items
   */
  filterChange(): void {
    this.setItems(this._items);
  }

  matchFilter(item: ListItem<T>): boolean {
    if (this.config.useCustomFilter && this.config.filterFunction) {
      return this.config.filterFunction(item.data);
    }
    const data = item.data;

    if (data instanceof Object) {
      const values = Object.values(data);
      return values.join('').toLocaleLowerCase().includes(this.filterValue);
    }

    if (data instanceof String) {
      return data.includes(this.filterValue);
    }

    return false;
  }

  // <---------------- END FILTER ----------------->

  // <---------------- SELECTION ----------------->

  setItemSelected(item: ListItem<T>, value: boolean): void {
    item.selected = value;
    //TODO emit event selection change or something
  }

  selectAll(value: boolean): void {
    this.items.forEach((item) => {
      item.selected = value;
    });
  }

  getItemsSelected(): T[] {
    return this._items.filter((item) => item.selected).map((el) => el.data);
  }

  // <---------------- END  SELECTION ----------------->
}

import { DataTableColumnTmplComponent } from './data-table-column-tmpl.component';
export interface CellSelectedEventArg {
  rowIndex: number;
  colIndex: number;
  column: DataTableColumnTmplComponent;
  rowItem: any;
}

export interface RowSelectedEventArg {
  rowIndex: number;
  rowItem: any;
}

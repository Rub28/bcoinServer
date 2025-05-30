import type { BeanCollection } from '../context/context';
import { AgColumn } from '../entities/agColumn';
import type { AgProvidedColumnGroup } from '../entities/agProvidedColumnGroup';
import type { ColDef, ColGroupDef, SortDirection } from '../entities/colDef';
import type { ColumnEventType } from '../events';
import { ColumnKeyCreator } from './columnKeyCreator';
export declare function _createColumnTree(beans: BeanCollection, defs: (ColDef<any, any> | ColGroupDef<any>)[] | null | undefined, primaryColumns: boolean, existingTree: (AgColumn | AgProvidedColumnGroup)[] | undefined, source: ColumnEventType): {
    columnTree: (AgColumn | AgProvidedColumnGroup)[];
    treeDept: number;
};
export declare function _recursivelyCreateColumns(beans: BeanCollection, defs: (ColDef | ColGroupDef)[] | null, level: number, primaryColumns: boolean, existingColsCopy: AgColumn[], columnKeyCreator: ColumnKeyCreator, existingGroups: AgProvidedColumnGroup[], source: ColumnEventType): (AgColumn | AgProvidedColumnGroup)[];
/** Updates hide, sort, sortIndex, pinned and flex */
export declare function updateSomeColumnState(beans: BeanCollection, column: AgColumn, hide: boolean | null | undefined, sort: SortDirection | undefined, sortIndex: number | null | undefined, pinned: boolean | 'left' | 'right' | null | undefined, flex: number | null | undefined, source: ColumnEventType): void;
export declare function _updateColumnState(beans: BeanCollection, column: AgColumn, colDef: ColDef, source: ColumnEventType): void;
export declare function _addColumnDefaultAndTypes(beans: BeanCollection, colDef: ColDef, colId: string, isAutoCol?: boolean): ColDef;
export declare function depthFirstOriginalTreeSearch(parent: AgProvidedColumnGroup | null, tree: (AgColumn | AgProvidedColumnGroup)[], callback: (treeNode: AgColumn | AgProvidedColumnGroup, parent: AgProvidedColumnGroup | null) => void): void;

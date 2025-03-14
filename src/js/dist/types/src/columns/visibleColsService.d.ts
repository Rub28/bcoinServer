import type { NamedBean } from '../context/bean';
import { BeanStub } from '../context/beanStub';
import type { AgColumn } from '../entities/agColumn';
import type { AgColumnGroup } from '../entities/agColumnGroup';
import type { RowNode } from '../entities/rowNode';
import type { ColumnEventType } from '../events';
import type { ColumnPinnedType } from '../interfaces/iColumn';
export declare class VisibleColsService extends BeanStub implements NamedBean {
    beanName: "visibleCols";
    treeLeft: (AgColumn | AgColumnGroup)[];
    treeRight: (AgColumn | AgColumnGroup)[];
    treeCenter: (AgColumn | AgColumnGroup)[];
    private colsAndGroupsMap;
    leftCols: AgColumn[];
    rightCols: AgColumn[];
    centerCols: AgColumn[];
    allCols: AgColumn[];
    autoHeightCols: AgColumn[];
    bodyWidth: number;
    private leftWidth;
    private rightWidth;
    isBodyWidthDirty: boolean;
    private ariaOrderColumns;
    refresh(source: ColumnEventType, skipTreeBuild?: boolean): void;
    updateBodyWidths(): void;
    setLeftValues(source: ColumnEventType): void;
    private setFirstRightAndLastLeftPinned;
    private buildTrees;
    clear(): void;
    private joinColsAriaOrder;
    getAriaColIndex(colOrGroup: AgColumn | AgColumnGroup): number;
    private setLeftValuesOfGroups;
    private setLeftValuesOfCols;
    private joinCols;
    getAllTrees(): (AgColumn | AgColumnGroup)[] | null;
    isColDisplayed(column: AgColumn): boolean;
    getLeftColsForRow(rowNode: RowNode): AgColumn[];
    getRightColsForRow(rowNode: RowNode): AgColumn[];
    getColsForRow(rowNode: RowNode, displayedColumns: AgColumn[], filterCallback?: (column: AgColumn) => boolean, emptySpaceBeforeColumn?: (column: AgColumn) => boolean): AgColumn[];
    getContainerWidth(pinned: ColumnPinnedType): number;
    getColBefore(col: AgColumn): AgColumn | null;
    isPinningLeft(): boolean;
    isPinningRight(): boolean;
    private updateColsAndGroupsMap;
    isVisible(item: AgColumn | AgColumnGroup): boolean;
    getFirstColumn(): AgColumn | null;
    getColAfter(col: AgColumn): AgColumn | null;
    getColsLeftWidth(): number;
    getDisplayedColumnsRightWidth(): number;
    isColAtEdge(col: AgColumn | AgColumnGroup, edge: 'first' | 'last'): boolean;
}
export declare function depthFirstAllColumnTreeSearch(tree: (AgColumn | AgColumnGroup)[] | null, useDisplayedChildren: boolean, callback: (treeNode: AgColumn | AgColumnGroup) => void): void;

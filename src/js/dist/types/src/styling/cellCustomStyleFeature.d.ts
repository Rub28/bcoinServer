import { BeanStub } from '../context/beanStub';
import type { BeanCollection } from '../context/context';
import type { CellCtrl, ICellComp } from '../rendering/cell/cellCtrl';
export declare class CellCustomStyleFeature extends BeanStub {
    private readonly cellCtrl;
    private readonly column;
    private staticClasses;
    private cellComp;
    private cellClassRules?;
    constructor(cellCtrl: CellCtrl, beans: BeanCollection);
    setComp(comp: ICellComp): void;
    applyCellClassRules(): void;
    applyUserStyles(): void;
    applyClassesFromColDef(): void;
    private getCellClassParams;
}

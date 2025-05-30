import type { ApiFunction, ApiFunctionName } from '../api/iApiFunction';
import type { NamedBean } from '../context/bean';
import { BeanStub } from '../context/beanStub';
import type { BeanCollection, UserComponentName } from '../context/context';
import type { ColDef, ColGroupDef } from '../entities/colDef';
import type { GridOptions } from '../entities/gridOptions';
import type { PropertyChangedSource } from '../gridOptionsService';
import type { RowNodeEventType } from '../interfaces/iRowNode';
import type { IconName } from '../utils/icon';
import type { ErrorId, GetErrorParams } from './errorMessages/errorText';
export declare class ValidationService extends BeanStub implements NamedBean {
    beanName: "validation";
    private gridOptions;
    wireBeans(beans: BeanCollection): void;
    postConstruct(): void;
    warnOnInitialPropertyUpdate(source: PropertyChangedSource, key: string): void;
    processGridOptions(options: GridOptions): void;
    validateApiFunction<TFunctionName extends ApiFunctionName>(functionName: TFunctionName, apiFunction: ApiFunction<TFunctionName>): ApiFunction<TFunctionName>;
    missingUserComponent(propertyName: string, componentName: string, agGridDefaults: {
        [key in UserComponentName]?: any;
    }, jsComps: {
        [key: string]: any;
    }): void;
    checkRowEvents(eventType: RowNodeEventType): void;
    validateIcon(iconName: IconName): void;
    validateMenuItem(key: string): void;
    isProvidedUserComp(compName: string): boolean;
    validateColDef(colDef: ColDef | ColGroupDef, colId: string, skipInferenceCheck?: boolean): void;
    private processOptions;
    private checkForRequiredDependencies;
    private checkProperties;
    getConsoleMessage<TId extends ErrorId>(id: TId, args: GetErrorParams<TId>): any[];
}
export declare function _fuzzyCheckStrings(inputValues: string[], validValues: string[], allSuggestions: string[]): {
    [p: string]: string[];
};

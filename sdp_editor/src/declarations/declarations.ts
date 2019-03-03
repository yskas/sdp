export namespace Declarations {
    export enum ElementTypes {
        input = "input",
        label = "label",
        grid = "grid",
        bubble = "bubble"
    }
    export class Position {
        top: string = "0px";
        left: string = "0px";
        height: string = "0px";
        width: string = "0px";
        fontSize: string = "10pt";
        borderWidth: string = "0px";
        borderColor: string = "0px";
        backgroundColor: string = "white";
    };
}
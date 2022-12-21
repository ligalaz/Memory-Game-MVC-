import { IResult } from "./interface";

export const endTime = 0;

export function sortingByTime(arr: Array<IResult>): Array<IResult> {
    return arr.sort((a, b) => (a.time < b.time ? -1 : a.time > b.time ? 1 : 0));
}

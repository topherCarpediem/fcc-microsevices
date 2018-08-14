import { ITimestamp } from "../interfaces";

export class Timestamp implements ITimestamp {
    public unix: number;
    public utc: string;
    constructor(date: Date) {
        this.unix = date.getTime();
        this.utc = date.toUTCString();
    }
}
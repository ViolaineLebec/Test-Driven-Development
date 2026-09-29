export class Door {
    name: string;
    isClosed: boolean;

    constructor(name: string) {
        this.name = name;
        this.isClosed = true;
    }

    passDoor(): boolean {
        if (this.isClosed) {
            return false;
        }
        return true;
    }

    openDoor(): void {
        if (!this.isClosed) {
            return;
        }
        this.isClosed = false;
        return;
    }
}
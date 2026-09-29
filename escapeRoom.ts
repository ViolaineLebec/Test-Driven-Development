export class Door {
    name: string;
    isClosed: boolean;
    key: string | undefined;

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

    imposeKey(key: string): void {
        this.key = key;
    }
}

// export class Key {
//     doors: Door[];

//     constructor() {
//         this.doors = [];
//     }

//     addDoor(door: Door): void {
//         this.doors.push(door);
//     }

//     isOkForDoor(door: Door): boolean {
//         if (this.doors.find(door => door.name === door.name) !== undefined) {
//             return true;
//         }
//         return false;
//     }

// }

export class Player {
    inventory: string[];

    constructor() {
        this.inventory = [];
    }

    addKey(key: string): void {
        this.inventory.push(key);
    }

    canOpenDoor(door: Door): boolean {
        if (door.key === undefined) {
            return true;
        }
        if (this.inventory.find(key => key === door.key) !== undefined) {
            return true;
        }
        return false;
    }

    openDoor(door: Door): void {
        if (!this.canOpenDoor) {
            return;
        }
        this.inventory = this.inventory.filter(element => element !== door.key);
        door.isClosed = false;
    }
}
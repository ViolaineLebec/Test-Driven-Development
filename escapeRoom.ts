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

    addToInventory(object: string): void {
        this.inventory.push(object);
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

    pickObject(object: string, room: Room): string {
        if (room.items.find(i => i === object) === undefined) {
            return "impossible, cet objet n'est pas dans cette salle";
        }
        this.addToInventory(object);
        room.removeItem(object);
        return "objet ramassé";
    }

    useObject(object: string): boolean {
        if (!this.inventory.find(object => object === object)) {
            return false;
        }
        this.inventory = this.inventory.filter(e => e !== object);
        return true;
    }
}

export class Room {
    items: string[];

    constructor() {
        this.items = [];
    }

    addItem(object: string): void {
        this.items.push(object);
    }

    removeItem(object: string): void {
        this.items = this.items.filter(e => e !== object);
    }
}
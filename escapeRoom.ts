export class Door {
    name: string;
    isClosed: boolean;
    key: string | undefined;
    enigma: Enigma | undefined;

    constructor(name: string) {
        this.name = name;
        this.isClosed = true;
        this.enigma = undefined;
        this.key = undefined;
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

    imposeEnigma(enigma: Enigma): void {
        this.enigma = enigma;
    }
}

export class Enigma {
    question: string;
    response: string;
    isSolved: boolean = false;

    constructor(question: string, response: string) {
        this.question = question;
        this.response = response;
    }
}

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
            if (door.enigma === undefined) {
                return true;
            }
            else if (door.enigma.isSolved === true) {
                return true;
            }
            return false;
        }
        else if (this.inventory.find(key => key === door.key) !== undefined) {
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

    tryEnigma(enigma: Enigma, response: string): boolean {
        if (response == enigma.response) {
            enigma.isSolved = true;
            return true;
        }
        return false;
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
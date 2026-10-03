export class Door {
    name: string;
    isLocked: boolean;
    key: string;
    enigma: Enigma;

    constructor(name: string) {
        this.name = name;
        this.isLocked = false;
        this.enigma = new Enigma("", "");
        this.key = "";
    }

    canBeOpen(): boolean {
        if (this.isLocked) {
            return false;
        }
        return true;
    }

    unlock(): void {
        if (!this.isLocked) {
            return;
        }
        this.isLocked = false;
        return;
    }

    requireKey(key: string): void {
        this.key = key;
    }

    requireEnigma(enigma: Enigma): void {
        this.enigma = enigma;
        this.enigma.isSolved = false;
    }
}

export class Enigma {
    question: string;
    response: string;
    isSolved: boolean;
    attempts: number;

    constructor(question: string, response: string) {
        this.question = question;
        this.response = response;
        this.isSolved = true;
        this.attempts = 0;
    }
}

export class Player {
    inventory: any[];
    unavailables: any[];

    constructor() {
        this.inventory = [""];
        this.unavailables = [];
    }

    addToInventory(element: any): void {
        this.inventory.push(element);
    }

    canOpenDoor(door: Door): boolean {
        if (door.enigma.isSolved) {
            if (this.inventory.find(e => e === door.key) !== undefined) {
                return true;
            }
            return false;
        }
        return false;
    }

    unlockDoor(door: Door): void {
        if (!this.canOpenDoor) {
            return;
        }
        this.inventory = this.inventory.filter(element => element !== door.key);
        door.isLocked = false;
    }

    pickObject(object: string, room: Room): string {
        if (room.items.find(i => i === object) === undefined) {
            return "impossible, cet objet n'est pas dans cette salle";
        }
        this.addToInventory(object);
        room.removeItem(object);
        return "objet ramassé";
    }

    canUseObject(object: any): boolean {
        if (this.inventory.find(e => e === object)) {
            return true;
        }
        return false;
    }

    tryEnigma(enigma: Enigma, response: string): boolean {
        if (response === enigma.response) {
            enigma.isSolved = true;
            return true;
        }
        enigma.attempts += 1;
        if (enigma.attempts === 3) {
            this.inventory = [];
            enigma.attempts = 0;
            return false;
        }
    }

    scream(alarm: Alarm) {
        alarm.activate();
        this.inventory.forEach(e => this.unavailables.push(e));
        this.inventory = [""];
    }

    tryDesactivateAlarm(alarm: Alarm): void {
        if (alarm.isActive === false) {
            return;
        }
        if (this.inventory.find(e => e === alarm.alarmCode) !== undefined) {
            alarm.isActive = false;
            this.unavailables.forEach(e => this.addToInventory(e));
            this.inventory = this.inventory.filter(e => e != alarm.alarmCode);
        }
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

export class Alarm {
    isActive: boolean;
    alarmCode: AlarmCode;

    constructor(alarmCode: AlarmCode) {
        this.isActive = false;
        this.alarmCode = alarmCode;
    }

    activate(): void {
        this.isActive = true;
    }

    desactivate(): void {
        this.isActive = false;
    }
}

export class AlarmCode {
    code: string

    constructor(code: string) {
        this.code = code;
    }
}
// Utilisez la méthodologie TDD :

// Écrivez le test correspondant à cette règle.
// Vérifiez que le test échoue.
// Écrivez le code nécessaire pour faire passer le test.
// Vérifiez que le test passe.
// Refactorisez votre code si nécessaire.

import { describe, expect, it } from "vitest";
import { Door, Enigma, Key, Player, Room } from "./escapeRoom";

describe("Door", () => {
    // Développez le comportement permettant de déterminer si une porte peut être franchie.
    // La règle métier est :
    // Une porte fermée ne peut pas être franchie.

    it("une porte fermée ne peut pas être franchie", () => {
        const door = new Door('porte 1');
        expect(door.passDoor()).toBe(false);
    });

    // Ajoutez le comportement permettant de franchir une porte ouverte.
    // La règle métier est :
    // Une porte ouverte peut être franchie.

    it("Une porte ouverte peut être franchie", () => {
        const door = new Door('porte 1');
        door.openDoor();
        expect(door.passDoor()).toBe(true);
    });

    // Ajoutez la possibilité d'ouvrir une porte nécessitant une clé.

    // Les règles métier sont :

    // chaque porte peut nécessiter une clé particulière ;
    // le joueur peut ouvrir la porte s'il possède la clé correspondante ;
    // le joueur ne peut pas ouvrir la porte s'il ne possède pas la clé correspondante.

    // Exemple :

    // Porte rouge → red-key
    // Porte bleue → blue-key

    it("chaque porte peut nécessiter une clé particulière", () => {
        const door = new Door('porte 1');
        door.imposeKey("bleu");
        expect(door.key).not.toBe(undefined);
    });


    it("le joueur peut ouvrir la porte s'il possède la clé correspondante", () => {
        const door = new Door('porte 1');
        const player = new Player;
        const key = "bleu";
        door.imposeKey(key);
        player.addToInventory(key);

        expect(player.canOpenDoor(door)).toBe(true);
    });

    it("le joueur ne peut pas ouvrir la porte s'il ne possède pas la clé correspondante", () => {
        const door = new Door('porte 1');
        const player = new Player;
        const key = "bleu";
        door.imposeKey(key);

        expect(player.canOpenDoor(door)).toBe(false);
    });


    // Faites évoluer le comportement d'ouverture d'une porte.

    // Nouvelle règle métier :

    // Lorsqu'une clé est utilisée pour ouvrir une porte, elle est retirée de l'inventaire du joueur.

    // Exemple :

    // Avant :
    // inventory = ["red-key", "torch"]

    // Ouverture de la porte avec red-key

    // Après :
    // inventory = ["torch"]

    // Vérifiez avec vos tests que :

    // la porte est ouverte ;
    // la clé utilisée est retirée de l'inventaire ;
    // les autres objets sont conservés.


    it("Lorsqu'une clé est utilisée pour ouvrir une porte, elle est retirée de l'inventaire du joueur", () => {
        const door = new Door('porte 1');
        const player = new Player;
        const key = "blue";
        door.imposeKey(key);
        player.addToInventory(key);
        player.addToInventory("red");
        player.addToInventory("torch");
        player.openDoor(door);

        expect(door.isClosed).toBe(false);
        expect(player.inventory).not.toContain(key);
        expect(player.inventory).toContain("red");
        expect(player.inventory).toContain("torch");

    });

    // Ajoutez la possibilité pour un joueur de ramasser un objet présent dans une salle.
    // La règle métier est :
    // Lorsqu'un joueur ramasse un objet, celui-ci est ajouté à son inventaire et retiré de la salle.
    // Exemple :
    // Avant :
    // room.items = ["torch"]
    // player.inventory = []
    // Après :
    // room.items = []
    // player.inventory = ["torch"]

    it("Lorsqu'un joueur ramasse un objet, celui-ci est ajouté à son inventaire et retiré de la salle", () => {
        const player = new Player;
        const object = "torch";
        const room = new Room;
        room.addItem(object);
        player.pickObject(object, room);

        expect(player.inventory).toContain(object);
        expect(room.items).not.toContain(object);
    });

    // Faites évoluer le comportement du ramassage.
    // La règle métier est :
    // Un objet déjà ramassé ne peut pas être ramassé une seconde fois.
    // Testez notamment le cas où le joueur tente de ramasser un objet qui ne se trouve plus dans la salle.
    // Avant de coder, déterminez ce que doit faire le moteur dans cette situation.

    it("Un objet déjà ramassé ne peut pas être ramassé une seconde fois", () => {
        const player = new Player;
        const object = "torch";
        const room = new Room;

        player.pickObject(object, room);

        expect(player.pickObject(object, room)).toEqual("impossible, cet objet n'est pas dans cette salle");

    });


    // Ajoutez la possibilité pour le joueur d'utiliser un objet.
    // La règle métier est :
    // Un joueur ne peut utiliser qu'un objet qu'il possède dans son inventaire.
    // Testez les deux situations :
    // le joueur possède l'objet ;
    // le joueur ne possède pas l'objet.
    // Déterminez le comportement attendu lorsqu'un joueur tente d'utiliser un objet qu'il ne possède pas.


    it("Un joueur peut utiliser un objet qu'il possède dans son inventaire", () => {
        const player = new Player;
        const object = "torch";
        player.addToInventory(object);

        expect(player.useObject(object)).toBe(true);
        expect(player.inventory).not.toContain(object);
    });

    it("Un joueur ne peut pas utiliser un objet qu'il ne possède pas dans son inventaire", () => {
        const player = new Player;
        const object = "torch";
        player.useObject(object);

        expect(player.useObject(object)).toBe(false);
    });

    // Ajoutez la possibilité de protéger une porte avec une énigme.
    // Une porte peut être associée à une énigme.
    // Pour franchir la porte, l’énigme doit avoir été résolue.
    // Le joueur doit fournir la bonne réponse pour résoudre l’énigme.
    // Une mauvaise réponse ne permet pas de résoudre l’énigme.
    // Une fois résolue, l’énigme reste résolue.
    // À faire :
    // Écrivez les tests avant le code.
    // Testez au minimum :
    //     la bonne réponse
    //     une mauvaise réponse
    //     le franchissement d’une porte dont l’énigme n’est pas résolue
    //     le franchissement d’une porte dont l’énigme est résolue
    // Faites passer les tests puis refactorez si nécessaire.
    // Déterminez le comportement attendu lorsqu'un joueur tente d'utiliser un objet qu'il ne possède pas.


    it("Une porte peut être associée à une énigme", () => {
        const door = new Door('porte 1');
        let enigma = new Enigma("M. et Mme Ervitmonslip ont deux fils, comment s'appellent-ils?", "Jean, Philippe");
        door.imposeEnigma(enigma);

        expect(door.enigma).not.toBe(undefined);
    });

    it("Le joueur doit fournir la bonne réponse pour résoudre l’énigme", () => {
        const door = new Door('porte 1');
        const player = new Player;
        const enigma = new Enigma("M. et Mme Ervitmonslip ont deux fils, comment s'appellent-ils?", "Jean, Philippe");
        door.imposeEnigma(enigma);
        player.tryEnigma(enigma, "Jean, Philippe");

        expect(enigma.isSolved).toBe(true);
    });

    it("Une mauvaise réponse ne permet pas de résoudre l’énigme", () => {
        const door = new Door('porte 1');
        const player = new Player;
        const enigma = new Enigma("M. et Mme Ervitmonslip ont deux fils, comment s'appellent-ils?", "Jean, Philippe");
        door.imposeEnigma(enigma);
        player.tryEnigma(enigma, "Jean, Charles");

        expect(enigma.isSolved).toBe(false);
    });

    it("Pour franchir la porte, l’énigme doit avoir été résolue", () => {
        const door = new Door('porte 1');
        const player = new Player;
        const enigma = new Enigma("M. et Mme Ervitmonslip ont deux fils, comment s'appellent-ils?", "Jean, Philippe");
        door.imposeEnigma(enigma);
        enigma.isSolved = false;

        expect(player.canOpenDoor(door)).toBe(false);
    });

    it("Pour franchir la porte, l’énigme doit avoir été résolue", () => {
        const door = new Door('porte 1');
        const player = new Player;
        const enigma = new Enigma("M. et Mme Ervitmonslip ont deux fils, comment s'appellent-ils?", "Jean, Philippe");
        door.imposeEnigma(enigma);
        enigma.isSolved = true;

        expect(player.canOpenDoor(door)).toBe(true);
    });

    // it("", () => {});


});
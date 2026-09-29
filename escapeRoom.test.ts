// Utilisez la méthodologie TDD :

// Écrivez le test correspondant à cette règle.
// Vérifiez que le test échoue.
// Écrivez le code nécessaire pour faire passer le test.
// Vérifiez que le test passe.
// Refactorisez votre code si nécessaire.

import { describe, expect, it } from "vitest";
import { Door, Key, Player } from "./escapeRoom";

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
        player.addKey(key);

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
        player.addKey(key);
        player.addKey("red");
        player.addKey("torch");
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

    it("", () => { });


    // it("", () => {});


});
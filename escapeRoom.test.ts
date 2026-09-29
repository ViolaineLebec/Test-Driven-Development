// Utilisez la méthodologie TDD :

// Écrivez le test correspondant à cette règle.
// Vérifiez que le test échoue.
// Écrivez le code nécessaire pour faire passer le test.
// Vérifiez que le test passe.
// Refactorisez votre code si nécessaire.

import { describe, expect, it } from "vitest";
import { Door } from "./escapeRoom";

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

    it()

});
// Utilisez la méthodologie TDD :

// Écrivez le test correspondant à cette règle.
// Vérifiez que le test échoue.
// Écrivez le code nécessaire pour faire passer le test.
// Vérifiez que le test passe.
// Refactorisez votre code si nécessaire.

import { describe, expect, it } from "vitest";
import { Alarm, AlarmCode, Door, Enigma, Key, Player, Room } from "./escapeRoom";

describe("Door", () => {
    // Développez le comportement permettant de déterminer si une porte peut être franchie.
    // La règle métier est :
    // Une porte fermée ne peut pas être franchie.

    it("une porte fermée ne peut pas être franchie", () => {
        const door = new Door('porte 1');
        door.isLocked = true;
        expect(door.canBeOpen()).toBe(false);
    });

    // Ajoutez le comportement permettant de franchir une porte ouverte.
    // La règle métier est :
    // Une porte ouverte peut être franchie.

    it("Une porte ouverte peut être franchie", () => {
        const door = new Door('porte 1');
        expect(door.canBeOpen()).toBe(true);
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
        door.requireKey("bleu");
        expect(door.key).not.toBe(undefined);
    });


    it("le joueur peut ouvrir la porte s'il possède la clé correspondante", () => {
        const door = new Door('porte 1');
        const player = new Player;
        const key = "bleu";
        door.requireKey(key);
        player.addToInventory(key);

        expect(player.canOpenDoor(door)).toBe(true);
    });

    it("le joueur ne peut pas ouvrir la porte s'il ne possède pas la clé correspondante", () => {
        const door = new Door('porte 1');
        const player = new Player;
        const key = "bleu";
        door.requireKey(key);

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
        door.requireKey(key);
        player.addToInventory(key);
        player.addToInventory("red");
        player.addToInventory("torch");
        player.unlockDoor(door);

        expect(door.isLocked).toBe(false);
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

        expect(player.canUseObject(object)).toBe(true);
        expect(player.inventory).toContain(object);
    });

    it("Un joueur ne peut pas utiliser un objet qu'il ne possède pas dans son inventaire", () => {
        const player = new Player;
        const object = "torch";
        player.canUseObject(object);

        expect(player.canUseObject(object)).toBe(false);
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
        door.requireEnigma(enigma);

        expect(door.enigma).not.toBe(undefined);
    });

    it("Le joueur doit fournir la bonne réponse pour résoudre l’énigme", () => {
        const door = new Door('porte 1');
        const player = new Player;
        const enigma = new Enigma("M. et Mme Ervitmonslip ont deux fils, comment s'appellent-ils?", "Jean, Philippe");
        door.requireEnigma(enigma);
        player.tryEnigma(enigma, "Jean, Philippe");

        expect(enigma.isSolved).toBe(true);
    });

    it("Une mauvaise réponse ne permet pas de résoudre l’énigme", () => {
        const door = new Door('porte 1');
        const player = new Player;
        const enigma = new Enigma("M. et Mme Ervitmonslip ont deux fils, comment s'appellent-ils?", "Jean, Philippe");
        door.requireEnigma(enigma);
        player.tryEnigma(enigma, "Jean, Charles");

        expect(enigma.isSolved).toBe(false);
    });

    it("Pour franchir la porte, l’énigme doit avoir été résolue", () => {
        const door = new Door('porte 1');
        const player = new Player;
        const enigma = new Enigma("M. et Mme Ervitmonslip ont deux fils, comment s'appellent-ils?", "Jean, Philippe");
        enigma.isSolved = false;
        door.requireEnigma(enigma);

        expect(player.canOpenDoor(door)).toBe(false);
    });

    it("Pour franchir la porte, l’énigme doit avoir été résolue", () => {
        const door = new Door('porte 1');
        const player = new Player;
        const enigma = new Enigma("M. et Mme Ervitmonslip ont deux fils, comment s'appellent-ils?", "Jean, Philippe");
        door.requireEnigma(enigma);
        player.tryEnigma(enigma, "Jean, Philippe");

        expect(player.canOpenDoor(door)).toBe(true);
    });

    // Faites évoluer le fonctionnement des énigmes.
    // Chaque mauvaise réponse augmente le nombre de tentatives échouées.
    // Après 3 mauvaises réponses, une conséquence doit être déclenchée.
    // Une bonne réponse permet toujours de résoudre l’énigme.
    // Une énigme déjà résolue ne peut pas être résolue une seconde fois.
    // À faire :
    // Déterminez les cas à tester.
    // Écrivez les tests avant de modifier le code.
    // Vérifiez notamment les comportements à 2 puis 3 mauvaises réponses.

    it("Chaque mauvaise réponse augmente le nombre de tentatives échouées", () => {
        const door = new Door('porte 1');
        const player = new Player;
        const enigma = new Enigma("M. et Mme Ervitmonslip ont deux fils, comment s'appellent-ils?", "Jean, Philippe");
        door.requireEnigma(enigma);
        player.tryEnigma(enigma, "Jean, Charles");
        player.tryEnigma(enigma, "Pierre, Philippe");

        expect(enigma.attempts).toStrictEqual(2);

    });

    it("Après 3 mauvaises réponses, une conséquence doit être déclenchée", () => {
        const door = new Door('porte 1');
        const player = new Player;
        const enigma = new Enigma("M. et Mme Ervitmonslip ont deux fils, comment s'appellent-ils?", "Jean, Philippe");
        player.addToInventory("torch");
        player.addToInventory("blue");
        door.requireEnigma(enigma);
        player.tryEnigma(enigma, "Jean, Charles");
        player.tryEnigma(enigma, "Pierre, Philippe");
        player.tryEnigma(enigma, "Pierre, Charles");

        expect(player.inventory).toEqual([]);
        expect(enigma.attempts).toEqual(0);
    });

    it("Avant 3 mauvaises réponses, l'inventaire n'est pas vidé", () => {
        const door = new Door('porte 1');
        const player = new Player;
        const enigma = new Enigma("M. et Mme Ervitmonslip ont deux fils, comment s'appellent-ils?", "Jean, Philippe");
        player.addToInventory("torch");
        player.addToInventory("blue");
        door.requireEnigma(enigma);
        player.tryEnigma(enigma, "Jean, Charles");
        player.tryEnigma(enigma, "Pierre, Philippe");

        expect(player.inventory).not.toEqual([]);
        expect(enigma.attempts).toEqual(2);
    });

    // Ajoutez une alarme au jeu.
    // L’alarme peut être inactive ou active.
    // Une action permet d’activer l’alarme.
    // Une fois activée, l’alarme reste active jusqu’à sa désactivation.
    // Certaines portes ne peuvent pas être franchies lorsque l’alarme est active.
    // Une porte qui n’est pas concernée par l’alarme reste franchissable.
    // À faire :
    // Identifiez les différents comportements à tester.
    // Écrivez les tests avant le code.
    // Vérifiez que les règles précédentes continuent de fonctionner.

    it("Ajoutez une alarme au jeu. L’alarme peut être active", () => {
        const alarmCode = new AlarmCode("1234");
        const alarm = new Alarm(alarmCode);
        alarm.activate();
        expect(alarm.isActive).toBe(true);
    });

    it("Ajoutez une alarme au jeu. L’alarme peut être inactive", () => {
        const alarmCode = new AlarmCode("1234");
        const alarm = new Alarm(alarmCode);
        expect(alarm.isActive).toBe(false);
    });

    it("Une action permet d’activer l’alarme", () => {
        const alarmCode = new AlarmCode("1234");
        const alarm = new Alarm(alarmCode);
        const player = new Player;
        player.scream(alarm);

        expect(alarm.isActive).toBe(true);
    });

    it("Certaines portes ne peuvent pas être franchies lorsque l’alarme est active", () => {
        const alarmCode = new AlarmCode("1234");
        const alarm = new Alarm(alarmCode);
        const door_1 = new Door('door_1');
        const door_3 = new Door('door_3');
        const player = new Player;
        door_1.requireKey("blue");
        door_3.requireKey("red");
        player.addToInventory("red");
        player.addToInventory("blue");
        player.scream(alarm);

        expect(player.canOpenDoor(door_1)).toBe(false);
        expect(player.canOpenDoor(door_3)).toBe(false);
    });

    it("Une porte qui n’est pas concernée par l’alarme reste franchissable", () => {
        const alarmCode = new AlarmCode("1234");
        const alarm = new Alarm(alarmCode);
        const door_2 = new Door('door_2');
        const player = new Player;
        player.scream(alarm);

        expect(player.canOpenDoor(door_2)).toBe(true);
    });

    // Faites évoluer la désactivation de l’alarme.
    // L’alarme peut être désactivée uniquement avec le bon code.
    // Un mauvais code ne désactive pas l’alarme.
    // Une fois l’alarme désactivée, les portes bloquées par l’alarme peuvent à nouveau être franchies.
    // Le code permettant de désactiver l’alarme est un objet alarm-code.
    // L’utilisation de cet objet le consomme.
    // À faire :
    // Écrivez les tests avant le code.
    // Testez les cas de réussite et d’échec.
    // Vérifiez que alarm-code disparaît de l’inventaire après utilisation.

    it("L’alarme peut être désactivée avec le bon code", () => {
        const alarmCode = new AlarmCode("1234");
        const alarm = new Alarm(alarmCode);
        const player = new Player;
        player.scream(alarm);
        player.addToInventory(alarmCode);
        player.tryDesactivateAlarm(alarm);

        expect(alarm.isActive).toBe(false);
    });

    it("Un mauvais code ne désactive pas l’alarme", () => {
        const alarmCode = new AlarmCode("1234");
        const alarm = new Alarm(alarmCode);
        const code = new AlarmCode("1235");
        const player = new Player;
        player.scream(alarm);
        player.addToInventory(code);
        player.tryDesactivateAlarm(alarm);

        expect(alarm.isActive).toBe(true);
    });

    it("Une fois l’alarme désactivée, les portes bloquées par l’alarme peuvent à nouveau être franchies", () => {
        const door_1 = new Door('door_1');
        const door_3 = new Door('door_3');
        const code = new AlarmCode("1234");
        const alarm = new Alarm(code);
        const player = new Player;
        door_1.requireKey("blue");
        door_3.requireKey("red");
        player.addToInventory("red");
        player.addToInventory("blue");
        player.scream(alarm);
        player.addToInventory(code);
        player.tryDesactivateAlarm(alarm);

        expect(player.canOpenDoor(door_1)).toBe(true);
        expect(player.canOpenDoor(door_3)).toBe(true);

    });

    it("L'utilisation de l'objet alarm-code le consomme", () => {
        const code = new AlarmCode("1234");
        const alarm = new Alarm(code);
        const player = new Player;
        player.addToInventory(code.code);
        player.scream(alarm);
        player.tryDesactivateAlarm(alarm);

        expect(player.inventory).not.toContain(code.code);

    });

    // Certaines portes nécessitent maintenant plusieurs conditions pour être franchies.
    // La porte du laboratoire nécessite :
    // la clé du laboratoire ;
    // l’alarme désactivée ;
    // l’énigme du laboratoire résolue.
    // À faire :
    // Testez chaque situation :
    // aucune condition remplie ;
    // uniquement la clé ;
    // uniquement l’énigme ;
    // uniquement l’alarme désactivée ;
    // clé + énigme ;
    // clé + alarme désactivée ;
    // énigme + alarme désactivée ;
    // les trois conditions réunies.

    it("Sans clé, ni énigme résolue, ni désactivation de l'alarme, la porte du laboratoir ne peut pas être franchie.", () => {
        const laboDoor = new Door("laboDoor");
        const enigma = new Enigma("M. et Mme Ervitmonslip ont deux fils, comment s'appellent-ils?", "Jean, Philippe");
        const player = new Player;
        const code = new AlarmCode("1234");
        const alarm = new Alarm(code);
        laboDoor.requireEnigma(enigma);
        laboDoor.requireKey("blue");
        player.scream(alarm);

        expect(player.canOpenDoor(laboDoor)).toBe(false);
    });

    it("La clé ne suffit pas pour franchir la porte du laboratoire", () => {
        const laboDoor = new Door("laboDoor");
        const enigma = new Enigma("M. et Mme Ervitmonslip ont deux fils, comment s'appellent-ils?", "Jean, Philippe");
        const player = new Player;
        const code = new AlarmCode("1234");
        const alarm = new Alarm(code);
        laboDoor.requireEnigma(enigma);
        laboDoor.requireKey("blue");
        player.scream(alarm);
        player.addToInventory("blue");

        expect(player.canOpenDoor(laboDoor)).toBe(false);
    });

    it("Résoudre l'énigme ne suffit pas pour franchir la porte du laboratoire", () => {
        const laboDoor = new Door("laboDoor");
        const enigma = new Enigma("M. et Mme Ervitmonslip ont deux fils, comment s'appellent-ils?", "Jean, Philippe");
        const player = new Player;
        const code = new AlarmCode("1234");
        const alarm = new Alarm(code);
        laboDoor.requireEnigma(enigma);
        laboDoor.requireKey("blue");
        player.scream(alarm);
        player.tryEnigma(enigma, "Jean, Philippe");

        expect(player.canOpenDoor(laboDoor)).toBe(false);
    });

    it("Désactiver l'alarme ne suffit pas pour franchir la porte du laboratoire", () => {
        const laboDoor = new Door("laboDoor");
        const enigma = new Enigma("M. et Mme Ervitmonslip ont deux fils, comment s'appellent-ils?", "Jean, Philippe");
        const player = new Player;
        const code = new AlarmCode("1234");
        const alarm = new Alarm(code);
        laboDoor.requireEnigma(enigma);
        laboDoor.requireKey("blue");
        player.scream(alarm);
        player.addToInventory(code);
        player.tryDesactivateAlarm(alarm);

        expect(player.canOpenDoor(laboDoor)).toBe(false);
    });

    it("Résoudre l'énigme et avoir la clé ne suffisent pas pour franchir la porte du laboratoire", () => {
        const laboDoor = new Door("laboDoor");
        const enigma = new Enigma("M. et Mme Ervitmonslip ont deux fils, comment s'appellent-ils?", "Jean, Philippe");
        const player = new Player;
        const code = new AlarmCode("1234");
        const alarm = new Alarm(code);
        laboDoor.requireEnigma(enigma);
        player.tryEnigma(enigma, "Jean, Philippe");
        laboDoor.requireKey("blue");
        player.addToInventory("blue");

        player.scream(alarm);

        expect(player.canOpenDoor(laboDoor)).toBe(false);
    });

    it("Désactiver l'alarme et avoir la clé ne suffisent pas pour franchir la porte du laboratoire", () => {
        const laboDoor = new Door("laboDoor");
        const enigma = new Enigma("M. et Mme Ervitmonslip ont deux fils, comment s'appellent-ils?", "Jean, Philippe");
        const player = new Player;
        const code = new AlarmCode("1234");
        const alarm = new Alarm(code);
        laboDoor.requireEnigma(enigma);
        laboDoor.requireKey("blue");
        player.addToInventory("blue");
        player.scream(alarm);
        player.addToInventory(code);

        expect(player.canOpenDoor(laboDoor)).toBe(false);
    });

    it("Résoudre l'énigme et désactiver l'alarme ne suffisent pas pour franchir la porte du laboratoire", () => {
        const laboDoor = new Door("laboDoor");
        const enigma = new Enigma("M. et Mme Ervitmonslip ont deux fils, comment s'appellent-ils?", "Jean, Philippe");
        const player = new Player;
        const code = new AlarmCode("1234");
        const alarm = new Alarm(code);
        laboDoor.requireEnigma(enigma);
        player.tryEnigma(enigma, "Jean, Philippe");
        laboDoor.requireKey("blue");
        player.scream(alarm);
        player.addToInventory(code);
        player.tryDesactivateAlarm(alarm);

        expect(player.canOpenDoor(laboDoor)).toBe(false);
    });

    it("La porte du laboratoire nécessite une clé, une énigme résolue et une alarme désactivée pour être franchie", () => {
        const laboDoor = new Door("laboDoor");
        const enigma = new Enigma("M. et Mme Ervitmonslip ont deux fils, comment s'appellent-ils?", "Jean, Philippe");
        const player = new Player;
        const code = new AlarmCode("1234");
        const alarm = new Alarm(code);
        laboDoor.requireEnigma(enigma);
        player.tryEnigma(enigma, "Jean, Philippe");
        laboDoor.requireKey("blue");
        player.addToInventory("blue");
        player.scream(alarm);
        player.addToInventory(code);
        player.tryDesactivateAlarm(alarm);

        expect(player.canOpenDoor(laboDoor)).toBe(true);
    });
});
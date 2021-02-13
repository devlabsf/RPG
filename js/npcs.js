// NPCs
// Some NPCs might be randomly set.
let lazlo = new NPC("Lazlo", "Former Mizukage");
lazlo.setPosition(23, 1);
lazlo.setImg("/images/lazlo.jpg");

lazlo.setGreeting = ["Bonjour!", "Je m'appelle Lazlo, les treize Mizukage.", "J'ai:"]
lazlo.setSpeech = ["Attaquez les Otsutsukis!", "Style de l'eau: Pistolet à eau Jutsu!", "Allons-y!", "Faisons du trading!", "Je voudrais une autre épée d'eau!"];
lazlo.addToInventory(waterSword);
lazlo.addToInventory(waterShells);
lazlo.addToInventory(spikeBall, 10);

let john = new NPC("John", "Thief Apprentice");
john.setPosition(5, 4);
john.setImg("/images/john.jpg");
john.addToInventory(smokeBomb, 4);
john.addToInventory(lockPickSet);
john.addToInventory(spikeBall, 2);
john.addToInventory(smokeBomb, 3);

john.setGreeting = ["Greeting Fellow Travelers.", "I am Johnathan Berliton. Master Thief of the Road", "I have:"]
john.setSpeech = ["HEhe", "Sneaky BOiiiiii", "I'm the man of Steal", "Time to trade!", "Je voudrais des crochets BOIIII"];

let harry = new NPC("Harry", "Lord Awekage", "Lord of Awesegakure");
harry.setPosition(23, 3);
harry.setImg("/images/harry.jpg");
//harry.addToInventory(new Item("Metal Ingots", "craft", 2400));
harry.addToInventory(superRobot);
harry.addToInventory(sharpWhip, 2);
harry.setGreeting = ["Greeting Fellow Muffins.", "I am Harry Oltmans. Lord Awekage of Awegakure or Awesomeness Town!", "I have:"]
harry.setSpeech = ["MUFFINS", "OOOOOHH", "I sMeLL GOod ITEms", "leT'S TRadE!", "i wAnNA KuNAi"];


let npcs = []
npcs.push(john)
npcs.push(harry)
npcs.push(lazlo)
//WEAPONS
let kunai = new Weapon("Kunai", 100, 25, 10);
let shuriken = new Weapon("Shuriken", 200, 25, 10);
let paperBomb = new Weapon("Paper Bomb", 50, 10, 5);
let waterSword = new Weapon("Ultimate Water Sword", 20000, 5, 20);
let spikeBall = new Weapon("Spike Ball", 500, 2, 1);
let sharpWhip = new Weapon("Sharp Whip", 300, 10, 7);

// ARMOR
let leatherArmor = new Armor("Leather Armor", 500, 50, 10);
let chainMail = new Armor("Chain Mail", 700, 70, 10);

// SPECIAL
let lockPickSet = new Special("Lock Pick Set", 400)
let smokeBomb = new Special("Smoke Bomb", 600);
let superRobot = new Special("Super Robot", 25000)
let waterShells = new Special('Water Shells', 2500);

// TREASURE
let bagOfGold = new Treasure("Bag of Gold", 100, "A dirty bag holding some worn but golden gleaming coins.")
let myLittlePony = new Treasure("Rainbow Brite My Little Pony", 1, "A child's toy figurine")

//POTIONS
let blueElixir = new Potion("Blue Elixir", 1000, 50, 3);
let greenELixir = new Potion("Green Elixir", 500, 45, 2);
let redElixir = new Potion("Red Elixir", 250, 35, 1);

// now we need to randomly spawn them in the level 
// and give them to player/NPCs


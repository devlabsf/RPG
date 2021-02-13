let mizuki = new Enemy("Mizuki", 2, 14, 200, '/images/mizuki.jpg');
mizuki.setPosition(6, 1);
let zabuza = new Enemy("Zabuza", 5, 25, 250);
zabuza.setPosition(20, 5);
let zabuza2 = new Enemy("Zabuza", 5, 23, 250);
zabuza2.setPosition(22, 1);
let genin = new Enemy("Evil Genin", 1, 10, 100);
genin.setPosition(9, 2);
let genin2 = new Enemy("Evil Genin", 1, 10, 100);
genin2.setPosition(15, 1);
let genin3 = new Enemy("Evil Genin", 1, 10, 100);
genin3.setPosition(19, 1);
let chunin = new Enemy("Evil Chunin", 3, 18, 185);
chunin.setPosition(15, 6);
let chunin2 = new Enemy("Evil Chunin", 3, 18, 185);
chunin2.setPosition(15, 4);
let spy = new Enemy("Evil Spy", 4, 21, 220)
spy.setPosition(6, 6);

// enemies array. This will probably become OO
let enemies = [];
enemies.push(mizuki);
enemies.push(zabuza);
enemies.push(genin);
enemies.push(genin2);
enemies.push(genin3);
enemies.push(chunin);
enemies.push(chunin2);
enemies.push(spy);
enemies.push(zabuza2)
//smoke bombs are 200ryo for 1x- lock picks are 400 for 1x- Spike balls
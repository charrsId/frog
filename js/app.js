// 这是我们的玩家要躲避的敌人 
var Enemy = function () {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x = 0 - Math.ceil(Math.random() * 80);
    this.y = rowDistance * enemyRows[Math.ceil(Math.random() * 4) - 1] - 20;
    this.speed = (100 + Math.random() * 100) + level * 50;
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';

};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function (dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += dt * this.speed * level;
    if (this.x > ctx.canvas.width) {
        this.x = -100;
        this.y = rowDistance * enemyRows[Math.ceil(Math.random() * 4) - 1] - 20;
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Princess = function () {
    this.x = 202;
    this.y = -5;
    this.name = 'princess';
    this.sprite = 'images/char-princess-girl.png';
    this.init = function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}
var princess = new Princess();

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function () {
    this.x = 202;
    this.y = 83 * 5;
    this.name = 'player';
    this.sprite = 'images/char-horn-girl.png';
};
Player.prototype.update = function () {
    //难度和敌人数量修正
    if (allEnemies.length < enemyLimit + level) {
        allEnemies.push(new Enemy());
    }
    for (var i = 0; i < allEnemies.length; i++) {
        let enemy = allEnemies[i];
        if (enemy.y + 20 == this.y) {
            if (Math.abs(enemy.x - this.x) < 50) {
                player = new Player();
                if (--life == 0) {
                    //game over
                    level = 1;
                    score = 1;
                }
                break;
            }
        }
    }
    if (princess.x === this.x && princess.y === this.y - 5) {
        if (level < maxLevel) {
            level++;
        }
        score += 100 * level;
        player = new Player();
    }
}
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y - 10);
}
Player.prototype.handleInput = function (direction) {
    switch (direction) {
        case 'left':
            if (player.x >= 101) {
                player.x -= 101;
            }
            break;
        case 'up':
            if (player.y >= 83) {
                player.y -= 83;
            }
            break;
        case 'right':
            if (player.x < 101 * 4) {
                player.x += 101;
            }
            break;
        case 'down':
            if (player.y < 83 * 5) {
                player.y += 83;
            }
            break;
    }

}
var colDistance = 101; //列间距
var rowDistance = 83; //行间距
var enemyRows = [1, 2, 3, 4]; //生成敌人（或障碍物、道具等）的行
var enemyLimit = 3; //最大敌人初始限制LEVEL 1
var level = 1; //初始难度
var maxLevel = 5; //最高难度
var life = 3; //生命
var score = 0; //得分

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies = [];
let enemyInstance = new Enemy();
allEnemies.push(enemyInstance);

var player = new Player();

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
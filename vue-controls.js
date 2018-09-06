new Vue({
    el: '#app',
    data: {
        startGame: false,
        youHealth: 0,
        oponentHealth: 0,
        youWin: false,
        youSurrender: false,
        youWin: false,

        // html output (list)
        listDamage: ''
    },
    methods: {
        // public methods
        startGameF: function() {
            this.startGame = true;
            this.youHealth = 100;
            this.oponentHealth = 100;
            this.youSurrender = false;
            this.youWin = false;
            this.listDamage = '';
        },
        attackF: function() {
            var num = this.numberRandom(1, 10);
            if ( this.oponentHealth - num <= 0 ) {
                this.oponentHealth = 0;
                this.youWin = true;
                this.printYouDamage(num);
            } else {
                this.oponentHealth -= num;
                this.printYouDamage(num);
                this.oponentAttack();
            }
        },
        superAttackF: function() {
            var num = this.numberRandom(10, 20);
            if ( this.oponentHealth - num <= 0 ) {
                this.oponentHealth = 0;
                this.youWin = true;
                this.printYouDamage(num);
            } else {
                this.oponentHealth -= num;
                this.printYouDamage(num);
                this.oponentAttack();
            }
        },
        healthF: function() {
            var num = this.numberRandom(5, 15);
            if ( this.youHealth + num >= 100 ) {
                this.youHealth = 100;
            } else {
                this.youHealth += num;
            }
            this.printHealt(num);
            this.oponentAttack();
        },
        surrenderF: function() {
            this.youHealth = 0;
            this.oponentHealth = 0;
            this.startGame = false;
            this.youSurrender = true;
        },

        // private methods
        numberRandom: function(min, max) {
            return Math.floor((Math.random() * max) + min);
        },
        oponentAttack: function() {
            var con = this.numberRandom(1, 4);
            var damage = 0;
            // calcular daño
            if (con == 3) {
                damage = this.numberRandom(10, 20);
            } else {
                damage = this.numberRandom(5, 10);
            }
            // pintar lista
            this.printEnemyDamage(damage);

            // restar vida propia
            if ( this.youHealth - damage <= 0 ) {
                this.youSurrender = true;
                this.youHealth = 0;
                this.startGame = false;
            } else {
                this.youHealth -= damage;
            }
        },

        // methods print
        printYouDamage: function(num) {
            this.listDamage += '<div class="alert alert-success" role="alert">';
            this.listDamage += 'You damage to enemy <b>';
            this.listDamage += num;
            this.listDamage += '</b> health.'
            this.listDamage += '</div>';
        },
        printEnemyDamage: function(num) {
            this.listDamage += '<div class="alert alert-warning" role="alert">';
            this.listDamage += 'Enemy damage to you <b>';
            this.listDamage += num;
            this.listDamage += '</b> health.'
            this.listDamage += '</div>';
        },
        printHealt: function(num) {
            this.listDamage += '<div class="alert alert-primary" role="alert">';
            this.listDamage += 'Te has curado <b>';
            this.listDamage += num;
            this.listDamage += '</b> health.'
            this.listDamage += '</div>';
        },
    }
});
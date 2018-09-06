new Vue({
    el: '#app',
    data: {
        startGame: false,
        youHealth: 0,
        oponentHealth: 0,
        youWin: false,
        youSurrender: false,
        youWin: false,
        idOponent: 0,
        minDamage: 5,
        maxDamage: 10,
        SminDamage: 10,
        SmaxDamage: 20,
        
        // controls
        selectPJ: false,
        isPnj1: false,
        isPnj2: false,
        isPnj3: false,
        isPnj4: false,

        // html output (list)
        listDamage: ''
    },
    methods: {
        // public methods
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
            this.selectPJ = false;
        },
        selectPJF: function() {
            this.selectPJ = true;
        },
        selectedPJF: function(numpj) {
            this.idOponent = numpj;
            this.isPnj1 = false;
            this.isPnj2 = false;
            this.isPnj3 = false;
            this.isPnj4 = false;
            if (numpj == 1) {
                this.oponentHealth = 100;
                this.minDamage = 10;
                this.maxDamage = 15;
                this.SminDamage = 20;
                this.SmaxDamage = 25;
                this.isPnj1 = true;
            } else if (numpj == 2) {
                this.oponentHealth = 120;
                this.minDamage = 5;
                this.maxDamage = 10;
                this.SminDamage = 10;
                this.SmaxDamage = 20;
                this.isPnj2 = true;
            } else if (numpj == 3) {
                this.oponentHealth = 100;
                this.minDamage = 5;
                this.maxDamage = 10;
                this.SminDamage = 10;
                this.SmaxDamage = 20;
                this.isPnj3 = true;
            } else if (numpj == 4) {
                this.oponentHealth = 200;
                this.minDamage = 15;
                this.maxDamage = 20;
                this.SminDamage = 30;
                this.SmaxDamage = 40;
                this.isPnj4 = true;
            }
            this.youSurrender = false;
            this.startGame = true;
            this.youWin = false;
            this.listDamage = '';
            this.youHealth = 100;
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
                damage = this.numberRandom(this.SminDamage, this.SmaxDamage);
                if ( this.idOponent == 3 ) {
                    this.printEnemyDamage(damage, true, 'Overtime');
                } else if ( this.idOponent == 4 ) {
                    this.printEnemyDamage(damage, true, 'esto son 5 minutos');
                } else {
                    this.printEnemyDamage(damage, true, 'pide en el Dominos');
                }
            } else {
                damage = this.numberRandom(this.minDamage, this.maxDamage);
                this.printEnemyDamage(damage, false, '');
            }

            // restar vida propia
            if ( this.youHealth - damage <= 0 ) {
                this.youSurrender = true;
                this.youHealth = 0;
                this.startGame = false;
                this.selectPJ = false;
            } else {
                this.youHealth -= damage;
            }
        },

        // methods print
        printYouDamage: function(num) {
            this.listDamage += '<div class="alert alert-success" role="alert">';
            this.listDamage += 'Has hecho <b>';
            this.listDamage += num;
            this.listDamage += '</b> de daño.'
            this.listDamage += '</div>';
        },
        printEnemyDamage: function(num, ulti, nameAttack) {
            this.listDamage += '<div class="alert alert-warning" role="alert">';
            if (!ulti) {
                this.listDamage += 'El enemigo te ha hecho <b>';
                this.listDamage += num;
                this.listDamage += '</b> de daño.'
            } else {
                this.listDamage += 'El enemigo te ha lanzado un ataque llamado <b>';
                this.listDamage += nameAttack;
                this.listDamage += '</b> y te ha hecho <b>';
                this.listDamage += num;
                this.listDamage += '</b> de daño.'
            }
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
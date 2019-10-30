function sign(iden, text, click) {
    return {
        iden, text, click
    }
}

function malfunction(iden, text) {
    return {
        iden, text
    }
}

const signs_brake =[
    sign('a','Тормозной путь больше допускаемого (10 м при скорости 30 км/ч)', false),
    sign('b','Торможение неравномерное, рывками', false),
    sign('c','Притормаживание трактора, прицеппа при отпущенной педали', false),
    sign('d','Растормаживание происходит медленно', false),
    sign('e','Трактор «заносит», прицеп «набегает» на трактор', false),
]

const signs_sensor =[
    sign('f','Давление в системе поднимается медленно (более 2 мин) от нуля до рабочего', false),
    sign('g','Давление ниже 0,60–0,65 МПа, при котором компрессор должен включаться', false),
    sign('end','Вопросов более нет', false),
]

const signs=[
    sign('a','Тормозной путь больше допускаемого (10 м при скорости 30 км/ч)', false),
    sign('b','Торможение неравномерное, рывками', false),
    sign('j','Торможение равномерное, рывками', false),
    sign('c','Притормаживание трактора, прицеппа при отпущенной педали', false),
    sign('d','Растормаживание происходит медленно', false),
    sign('e','Трактор «заносит», прицеп «набегает» на трактор', false),
    sign('f','Давление в системе поднимается медленно (более 2 мин) от нуля до рабочего', false),
    sign('g','Давление ниже 0,60–0,65 МПа, при котором компрессор должен включаться', false),
]

const malfunctions =[
    malfunction('ac','Свободный ход тормозной педали отклоняется за пределы 45 мм'),
    malfunction('ab','Повышенный неравномерный зазор между колодками и барабаном колесных тормозов (Т-150К, прицепы)'),
    malfunction('afg','Утечка воздуха на участке между тормозным краном и тормозными камерами'),
    malfunction('ac','Разрегулирован или неисправен тормозной кран'),
    malfunction('ab','Ход штоков тормозных камер отклоняется за пределы 15 – 20 мм (Т-150К)'),
    malfunction('ae','Не отрегулирован ход педалей тормозов (МТЗ, ЮМЗ)'),
    malfunction('cd','При работе тракторов МТЗ и ЮМЗ с прицепом, оборудованных тормозами с гидравлическим или пневматическим приводом, неисправен пневмопереходник или пневмоусилитель'),
    malfunction('afg','Слабое натяжение ремней привода компрессора (Т-150К)'),
    malfunction('cdg','Неисправен компрессор (негерметичность клапанов, износ или залегание поршневых колец)')
]

const malfunctions2 =[
    malfunction('acj','Свободный ход тормозной педали отклоняется за пределы 45 мм'),
    malfunction('ab','Повышенный неравномерный зазор между колодками и барабаном колесных тормозов (Т-150К, прицепы)'),
    malfunction('afg','Утечка воздуха на участке между тормозным краном и тормозными камерами'),
    malfunction('ac','Разрегулирован или неисправен тормозной кран'),
    malfunction('ab','Ход штоков тормозных камер отклоняется за пределы 15 – 20 мм (Т-150К)'),
    malfunction('ae','Не отрегулирован ход педалей тормозов (МТЗ, ЮМЗ)'),
    malfunction('cd','При работе тракторов МТЗ и ЮМЗ с прицепом, оборудованных тормозами с гидравлическим или пневматическим приводом, неисправен пневмопереходник или пневмоусилитель'),
    malfunction('afg','Слабое натяжение ремней привода компрессора (Т-150К)'),
    malfunction('cdg','Неисправен компрессор (негерметичность клапанов, износ или залегание поршневых колец)')
]

new Vue({
    el: '#app',
    data: {
        malfunctions: malfunctions,
        signs_brake: signs_brake,
        signs_sensor: signs_sensor,
        tek: 0,
    },
    methods: {
    },
    computed: {
        sign(){
            if (this.tek<5) return this.signs_brake[this.tek]
            else return this.signs_sensor[this.tek-5]
        },
        checked_signs() {
            var nothis = this
            const filtered_brake = this.signs_brake.filter(function (sign_brake) {
                return sign_brake.click
            })
            const filtered_sensor = this.signs_sensor.filter(function (sign_sensor) {
                return sign_sensor.click
            })
            let checked = new Array();
            filtered_brake.forEach(function (sign) {
                checked.push(sign.iden)
            });
            filtered_sensor.forEach(function (sign) {
                checked.push(sign.iden)
            });
            console.log(checked)
            return checked
        },
        filteredMalfunction() {
            var nothis = this
            const filtered = this.malfunctions.filter(function (malfunction) {
                console.log(malfunction.iden)
                return nothis.checked_signs.some(function(v) { return malfunction.iden.indexOf(v) >= 0; })
            })
            filtered.sort(function(a, b){
                var ax=0;
                var bx=0
                nothis.checked_signs.forEach(function (sign) {
                    if(a.iden.includes(sign)) ax++;
                    if(b.iden.includes(sign)) bx++;
                    });
                return bx-ax
            })
            return filtered
        },
    }
})

new Vue({
    el: '#app2',
    data: {
        malfunctions: malfunctions2,
        signs: signs
    },
    methods: {
    },
    computed: {
        checked_signs() {
            var nothis = this
            const filtered = this.signs.filter(function (sign) {
                return sign.click
            })
            let checked = new Array();
            filtered.forEach(function (sign) {
                checked.push(sign.iden)
            });
            console.log(checked)
            return checked
        },
        filteredMalfunction() {
            var nothis = this
            const filtered = this.malfunctions.filter(function (malfunction) {
                console.log(malfunction.iden)
                return nothis.checked_signs.some(function(v) { return malfunction.iden.indexOf(v) >= 0; })
            })
            filtered.sort(function(a, b){
                var ax=0;
                var bx=0
                nothis.checked_signs.forEach(function (sign) {
                    if(a.iden.includes(sign)) ax++;
                    if(b.iden.includes(sign)) bx++;
                });
                return bx-ax
            })
            return filtered
        },
    }
})
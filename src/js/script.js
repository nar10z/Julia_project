let gen = new Generator(examples, 2, 8);

$(document).ready(async function () {
    let $create_form = $('#create_form');
    let $count_word = $('#count_word');
    let $min_length = $('#min_length');
    let $result = $('#result');

    $create_form.on('submit', function (e) {
        e.preventDefault();

        // кол-во генерируемых названий
        let count = $count_word.val();
        // минимальная длина слова
        let min_length = $min_length.val();


        // преобразуем значение в чилсо, и ели оно NaN (Not a Number) то приравневаем его к стандартным значениям
        count = Number(count);
        if (isNaN(count)) {
            count = 1;
        }

        min_length = Number(min_length);
        if (isNaN(min_length)) {
            min_length = 4;
        }


        // нового минимальное кол-во символов
        gen.minLength = min_length;

        let res = [];
        for (let i = 0; i < count; i++) {
            // добавляем в массив результов новое сгенерируемое имя
            res.push(gen.genName())
        }


        let html = '<ul>';
        res.forEach(el => {
            html += `<li>${el}</li>`
        });
        html += '</ul>';


        // Добавляем в блок с результатами новые сгенерируемые названия
        $result.html(html);
    })
});
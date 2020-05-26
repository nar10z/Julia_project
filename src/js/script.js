let gen = new Generator(examples, 2, 8);
;

$(document).ready(async function () {
    let $create_form = $('#create_form');
    let $count_word = $('#count_word');
    let $min_length = $('#min_length');
    let $result = $('#result');

    $create_form.on('submit', function (e) {
        e.preventDefault();

        if (!gen) {
            alert('Данные еще не загрузились');
            return;
        }

        let count = $count_word.val();
        let min_length = $min_length.val();

        count = Number(count);
        if (isNaN(count)) {
            count = 1;
        }

        min_length = Number(min_length);
        if (isNaN(min_length)) {
            min_length = 4;
        }


        gen.minLength = min_length;

        let res = [];
        for (let i = 0; i < count; i++) {
            res.push(gen.genName())
        }


        let html = '<ul>';
        res.forEach(el => {
            html += `<li>${el}</li>`
        });
        html += '</ul>';


        $result.html(html);
    })
});
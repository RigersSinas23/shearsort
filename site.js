let a = [];

function createMatrix() {
    if ($('#matrixTableId').lenght) {
        $('#matrixTableId').remove();
    }
    mytable = $('<table></table>').attr({
        id: "matrixTableId"
    });
    const rows = new Number($("#rows").val());
    const cols = new Number($("#columns").val());
    let tr = [];
    a = new Array(rows);

    for (let i = 0; i < rows; i++) {
        a[i] = new Array(cols);

        let row = $('<tr></tr>').attr({
            class: ["class1", "class2", "class3"].join(' ')
        }).appendTo(mytable);
        for (let j = 0; j < cols; j++) {
            $('<td></td>').text("").appendTo(row);
            a[i][j] = 0;
        }
    }
    mytable.appendTo("#matrixTableId");
    console.table(a)
}

function clear() {
    mytable.innerHTML = '';

}

function sort() {
    let pow = 1,
        div = 1;
    let h = [];

    for (let i = 1; i * i <= a.length; i++)
        if (a.length % i == 0) div = i;
    Rows = div;
    Cols = a.length / div;
    for (Log = 0; pow <= Rows; Log++)
        pow = pow * 2;

    h = new Array(Rows);
    for (let i = 0; i < Rows; i++)
        h[i] = i * Cols;

    for (let k = 0; k < Log; k++) {
        for (let j = 0; j < Cols / 2; j++) {
            for (let i = 0; i < Rows; i++)
                sortPart1(a, i * Cols, (i + 1) * Cols, 1, (i % 2 == 0 ? true : false));

            for (let i = 0; i < Rows; i++)
                sortPart2(a, i * Cols, (i + 1) * Cols, 1, (i % 2 == 0 ? true : false));

        }
        for (let j = 0; j < Rows / 2; j++) {
            for (let i = 0; i < Cols; i++)
                sortPart1(a, i, Rows * Cols + i, Cols, true);

            for (let i = 0; i < Cols; i++)
                sortPart2(a, i, Rows * Cols + i, Cols, true);

        }
    }
    for (let j = 0; j < Cols / 2; j++) {
        for (let i = 0; i < Rows; i++)
            sortPart1(a, i * Cols, (i + 1) * Cols, 1, true);

        for (let i = 0; i < Rows; i++)
            sortPart2(a, i * Cols, (i + 1) * Cols, 1, true);

    }
    for (let i = 0; i < Rows; i++)
        h[i] = -1;

    console.table(a)

    $("#matrixTableId").find('tr').each(function (i, el) {
        var tds = $(this).find('td');
        $.each(tds, function (j) {
            if (a[i][j] == 1) {
                tds.eq(j).css('background-color', 'red');
            }
            if (a[i][j] == 0) {
                tds.eq(j).css('background-color', 'green');
            }
        });
    });
}

function sortPart1(a, Lo, Hi, Nx, Up) {
    for (let j = Lo; j + Nx < Hi; j += 2 * Nx)
        if ((Up && a[j] > a[j + Nx]) || !Up && a[j] < a[j + Nx]) {
            let T = a[j];
            a[j] = a[j + Nx];
            a[j + Nx] = T;
        }
}

function sortPart2(a, Lo, Hi, Nx, Up) {
    for (let j = Lo + Nx; j + Nx < Hi; j += 2 * Nx)
        if ((Up && a[j] > a[j + Nx]) || !Up && a[j] < a[j + Nx]) {
            let T = a[j];
            a[j] = a[j + Nx];
            a[j + Nx] = T;
        }
}

$(function () {
    $(document).on("click", "table tr td", function () {
        var color = $('#dropDown').val();
        $(this).css('background-color', color);
        var $this = $(this);
        var col = $this.index();
        var row = $this.closest('tr').index();

        if (color === 'red') {
            $(this).val(1);
            a[col][row] = 1;
        } else {
            $(this).val(0);
            a[col][row] = 0;
        }
        console.table(a)
    });

});
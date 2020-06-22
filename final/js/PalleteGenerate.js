$(() => {
    $('#main').on('click', () => {
        // 取得要插入按鈕的 HTML element
        let $col = $('#SelfDefined>.Palette_colors')

        // InputColor
        let IC = $('#InputColor').val()

        // 在記憶體產生一個 button 的 DOM element
        $btn = $('<button>').attr('class', 'Palette_color').css("background-color", IC).attr('data-color', IC)

        // 將產生的button與Click事件綁定
        $btn.on('click', (eventObject) => {
            // 取得引發事件的人是那個 button
            $this = $(eventObject.target)
        })

        // 將 $btn 插入至 $col 裡面，則 $btn 就能在網頁中顯示出來
        $col.append($btn)
        // bindListener();

        // setTimeout(function () {
        //     $col.append($btn)
        // }, 0);

    })
})
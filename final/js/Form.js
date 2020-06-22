$(() => {

    $("input.submit").click(function () {
        var q1 = $("input.entry_94276115").val();
        console.log(q1);
        var q2 = $("input.entry_640303386").val();
        console.log(q2);
        var RESPONCES = "https://docs.google.com/forms/u/0/d/e/1FAIpQLScOZ6CMlPa6aKsSELS8G7Hc_xMSKUlXLJHNZ5oFSTtW3Crogg/formResponse?entry.94276115=" + q1 + "&entry.640303386=" + q2 + "&submit=Submit";


        $.getScript(RESPONCES);
        // $.getScript("https://docs.google.com/forms/u/0/d/e/1FAIpQLScOZ6CMlPa6aKsSELS8G7Hc_xMSKUlXLJHNZ5oFSTtW3Crogg/formResponse?entry.94276115=q1&entry.640303386=q2");
    })

})

// https://docs.google.com/spreadsheets/d/e/2PACX-1vTkq9DV4_Pa3SRE6Jl1HoQR0TzyGY1eHfo2vfrqMDJvSFaSagUDgyC-Tfo00R4rQHTUXmRFWJMUB85e/pubhtml
// https://docs.google.com/spreadsheets/d/e/2PACX-1vTkq9DV4_Pa3SRE6Jl1HoQR0TzyGY1eHfo2vfrqMDJvSFaSagUDgyC-Tfo00R4rQHTUXmRFWJMUB85e/pubhtml

// step 3 的 API URL
// https://script.google.com/macros/s/AKfycbxaiswIJ6gNgmMBQab_c2ivf9TcF5_kobYDmR9fyZTFbgPatMU/exec
// https://script.google.com/macros/s/AKfycbxaiswIJ6gNgmMBQab_c2ivf9TcF5_kobYDmR9fyZTFbgPatMU/exec
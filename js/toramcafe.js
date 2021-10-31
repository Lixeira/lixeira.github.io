$("#search").on("click", function () {
    const name = $("#item-name").val()
    const category = $("#item-category").val()

    if (name == "") {
        $("#error-msg").hide()
        return;
    }

    const api = "https://dot23-api.herokuapp.com/toramcafe"
    //const api = "http://localhost:5000/toramcafe"

    $.ajax({
        type: "GET",
        dataType: "json",
        url: api+"/"+category+"/"+name,
        success: function (result) {
            $("#error-msg").hide()
            $("#results-container").show()

            const pattern = /([0-9A-Z\+]+|[\-\[\]★\(\)\&])[a-z\'\.♪\:]*/g
            const translator_affix = $("#translate-api").is(":checked")?"https://translate.google.com/translate?sl=ja&tl=en&u=":""
            let results_html = String()
            for (const link of result["data"]) {
                const viewName = link.substr(link.indexOf("#") + 1).replace("_Crysta", "").match(pattern).join(" ").replace("the ", " the ").replace("of ", " of ").replace(" - ", "-").replace("with ", " with ")
                results_html += `<a href="${translator_affix+link}" target="_blank">${viewName}</a>`
            }

            if (results_html == "") {
                results_html = "Seems we found nothing."
            }
            
            $("#results").html(results_html)
        },
        error: function (result) {
            $("#error-msg").show()
        }
    })
})
//teste
$("#translate-api").on("change", function() {
    $("#search").click();
})
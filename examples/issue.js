var iprequest = {
    data: "foobar",
    timeout: 60,
    request: {
        "credentials": [
            {
                // "credential": "irma-demo.MijnOverheid.address",
                "credential": "irma-demo.RU.studentCard",
                "attributes": {
                    // "country": "The Netherlands",
                    // "city": "Nijmegen",
                    // "street": "Toernooiveld 212",
                    // "zipcode": "6525 EC"
                    "university":        "Radboud",
                    "studentCardNumber": "3.14159265358979323846264338328",
                    "studentID":         "s1234567",
                    "level":             "42"
                }
            }
        ]
    }
};

$(function() {
    var showWarning = function(msg) {
        $("#alert_box").html('<div class="alert alert-warning" role="alert">'
                             + '<strong>Warning:</strong> '
                             + msg + '</div>');
    };

    var showError = function (msg) {
        $("#alert_box").html('<div class="alert alert-danger" role="alert">'
                             + '<strong>Error:</strong> '
                             + msg + '</div>');
    };

    var success_fun = function(data) {
        $("#alert_box").html('<div class="alert alert-success" role="alert">'
                             + '<strong>Success:</strong> Credentials issued </div>');
    };

    $("#irma_btn").on("click", function() {
        // Clear errors
        $(".form-group").removeClass("has-error");
        $("#alert_box").empty();

        // Ready&Validate fields
        var error = false;
        var street = $("#inputStreet").prop("value");
        if (street === "") {
            error = true;
            $("#groupStreet").addClass("has-error");
        }

        var zipcode = $("#inputZipCode").prop("value");
        if (zipcode === "") {
            error = true;
            $("#groupZipCode").addClass("has-error");
        }

        var city = $("#inputCity").prop("value");
        if (city === "") {
            error = true;
            $("#groupCity").addClass("has-error");
        }

        var country = $("#inputCountry").prop("value");
        if (country === "") {
            error = true;
            $("#groupCountry").addClass("has-error");
        }

        // var attributes = {
        //     "country": country,
        //     "city": city,
        //     "street": street,
        //     "zipcode": zipcode
        // };
        // console.log(attributes);

        // iprequest.request.credentials[0].attributes = attributes;
        console.log(iprequest);
        if (error) {
            showWarning("Fields may not be empty");
            return;
        }

        var jwt = IRMA.createUnsignedIssuanceJWT(iprequest);
        IRMA.issue(jwt, success_fun, showWarning, showError);
    });
});

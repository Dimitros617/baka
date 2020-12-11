var disableddates = [];

function hoverChange2(ele) {


    if (ele.getAttribute('bool') == 1)
        ele.value = "Změnit na NE";
    else
        ele.value = "Změnit na ANO";
}

function hoverChangeEnd2(ele) {

    if (ele.getAttribute('bool') == 1)
        ele.value = "Viditelné: ANO";
    else
        ele.value = "Viditelné: NE";

}


function changeFrom(input) {


    let currentValue = input.value;
    let elemnts = document.getElementsByClassName("reserveTo");
    let elementTo;
    for (let i = 0; i < elemnts.length; i++) {
        if (elemnts[i].getAttribute('nameDB') == input.getAttribute('nameDB')) {
            elementTo = elemnts[i];
        }
    }

    elementTo.setAttribute("min", input.value);
    $("elementTo").datepicker({
        minDate: "currentValue"
    });
    elementTo.value = input.value;

}


function changeTo(input) {


    let currentValue = input.value;
    let elemnts = document.getElementsByClassName("reserveFrom");
    let elementFrom;
    for (let i = 0; i < elemnts.length; i++) {
        if (elemnts[i].getAttribute('nameDB') == input.getAttribute('nameDB')) {
            elementFrom = elemnts[i];
        }
    }
    let newValue = elementFrom.value
    let newValuestring = newValue;

    currentValue = currentValue.split('-');
    newValue = newValue.split('-');

    var new_start_date = new Date(currentValue[2], currentValue[1], currentValue[0]);
    var new_end_date = new Date(newValue[2], newValue[1], newValue[0]);

    if (new_end_date > new_start_date) {
        alert("Termín ukončení nemůže být před termínem začátku!");
        input.value = newValuestring;
    }
}

function showDate(input) {
    var min = input.getAttribute("min");
    if (min == null) {
        min = "today";
    }

    disableddates = input.parentElement.parentElement.getAttribute("data").split("/")
    $(".date").datepicker({
        beforeShowDay: DisableSpecificDates,
        dateFormat: "dd-mm-yy",
        minDate: "min"
    });
}

function DisableSpecificDates(date) {
    var string = jQuery.datepicker.formatDate('dd-mm-yy', date);
    return [disableddates.indexOf(string) == -1];
}



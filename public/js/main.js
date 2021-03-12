function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function changeSwitch(ele, checkbox, label, yes, no, input){

    checkbox.value = checkbox.value == "1" ? "0" : "1";

    if(input != undefined){
        input.value = checkbox.value;
    }

    checkbox.click();
    checkbox.click();

    if(checkbox.value == "1"){
        checkbox.setAttribute("checked", "");
    }else{
        checkbox.removeAttribute("checked");
    }

    label.innerHTML = checkbox.value == "1" ? yes : no;
}

function changeRadio(ele){

    let other_radio = document.getElementsByClassName(ele.getAttribute('for'));

    for (let radio of other_radio){

        radio.value = "0";
        radio.removeAttribute('checked');
        radio.parentNode.parentNode.children[1].innerHTML = "VYPNUTO"
    }

    let checkbox = ele.parentNode.children[0];
    let label = ele.parentNode.parentNode.children[1];

    checkbox.value = "1";

    checkbox.click();
    checkbox.click();

    checkbox.setAttribute("checked", "");


    label.innerHTML = "ZAPNUTO";
}

function saveImage(form, table, id, loading, request, img){



    loading.removeAttribute("hidden");
    request.setAttribute("hidden", "");

    $.ajax({
        url: '/save_image',
        method: 'POST',
        data: new FormData(form),
        processData: false,
        contentType: false,
        datatype : "application/json",
        success:function(response){

            loading.setAttribute("hidden", "");
            request.removeAttribute("hidden");

            if(response[0] == "1"){
                let refresh = '?random=\\' + new Date().getTime();
                img.setAttribute("style","background-image: url('/user_files/"+ response[1] + refresh +"');");
                request.innerHTML = '<b>&#10003;</b>';
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Upss...',
                    text: 'Tento obrázek se nám nepodařilo nahrát. Zkuste jiný obrázek.',
                    customClass: {
                        container: 'su-shake-horizontal',
                    }
                })
                request.innerHTML = '<b>&#x2715;</b>';
            }

            setTimeout(function (request){
                request.setAttribute("hidden", "");
            },1000,request);


        },
        error: function (response){
            console.log(response);
            if(response.status == 422){
                Swal.fire({
                    icon: 'error',
                    title: 'Hmm...',
                    text: 'Tento soubor není obrázek v podporovaném formátu: jpg, png, jpeg, gif, svg. Nebo je větší než 4Mb' ,
                    customClass: {
                        container: 'su-shake-horizontal',
                    }
                })
            }
            else{
                let err = IsJsonString(response.responseText)? JSON.parse(response.responseText).messages : response.responseText
                Swal.fire({
                    icon: 'error',
                    title: 'Hmm... CHYBA!',
                    text: err ,
                    customClass: {
                        container: 'su-shake-horizontal',
                    }
                })
            }
            request.removeAttribute("hidden");
            loading.setAttribute("hidden", "");
            request.innerHTML = '<b>&#x2715;</b>';

            setTimeout(function (request){
                request.setAttribute("hidden", "");
            },1000,request);
        }
    });
}

function saveName(form, table, id, loading, request){



    loading.removeAttribute("hidden");
    request.setAttribute("hidden", "");

    $.ajax({
        url: '/save_name',
        method: 'POST',
        data: new FormData(form),
        processData: false,
        contentType: false,
        datatype : "application/json",
        success:function(response){

            loading.setAttribute("hidden", "");
            request.removeAttribute("hidden");

            if(response[0] == "1"){
                request.innerHTML = '<b>&#10003;</b>';
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Upss...',
                    text: 'Nastal problém při ukládání do databáze, skuste to znovu, nebo kontaktujte administrátora!',
                    customClass: {
                        container: 'su-shake-horizontal',
                    }
                })
                request.innerHTML = '<b>&#x2715;</b>';
            }

            setTimeout(function (request){
                request.setAttribute("hidden", "");
            },1000,request);


        },
        error: function (response){
            console.log(response);
            let err = IsJsonString(response.responseText)? JSON.parse(response.responseText).messages : response.responseText
            Swal.fire({
                icon: 'error',
                title: 'Hmm...',
                text: 'Nastala chyba!' + err,
                customClass: {
                    container: 'su-shake-horizontal',
                }
            })
            request.removeAttribute("hidden");
            loading.setAttribute("hidden", "");
            request.innerHTML = '<b>&#x2715;</b>';

            setTimeout(function (request){
                request.setAttribute("hidden", "");
            },1000,request);
        }
    });
}

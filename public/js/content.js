
function addElement(parent, icon, spinner){

    icon.setAttribute("hidden", "");
    spinner.removeAttribute("hidden");

    let element_type = parent.getAttribute("include");
    let id = parent.getAttribute("element_id");
    let token = document.querySelectorAll("input[name='_token']")[0].value;

    $.ajax({
        url: '/add_'+ element_type,
        type: 'post',
        data: { _token: token, table_name: element_type, id: id},
        success:function(response){


                location.reload();


        },
        error: function (response){
            console.log(response);
            let err = IsJsonString(response.responseText)? JSON.parse(response.responseText).messages : response.responseText
            Swal.fire({
                icon: 'error',
                title: 'Hmm... CHYBA!',
                text: err ,
                customClass: {
                    container: 'su-shake-horizontal',
                }
            })

            spinner.setAttribute("hidden", "");
            icon.removeAttribute("hidden");

        }
    });

}

function moveElement(parent, direction, request, loading){

    loading.removeAttribute("hidden");
    request.setAttribute("hidden", "");

    let element_type = parent.getAttribute("type");
    let id = parent.getAttribute("element_id");
    let token = document.querySelectorAll("input[name='_token']")[0].value;

    $.ajax({
        url: '/move',
        type: 'post',
        data: { _token: token, table_name: element_type, id: id, direction: direction},
        success:function(response){

            location.reload();

        },
        error: function (response){
            console.log(response);
            let err = IsJsonString(response.responseText)? JSON.parse(response.responseText).messages : response.responseText
            Swal.fire({
                icon: 'error',
                title: 'Hmm... CHYBA!',
                text: err ,
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

/**
 *
 * @param element = (Element) ten který budeme editovat live
 * @param id = (Int) Id elementu do databáze
 * @param element_type = (String) Jméno tabulky v databázi
 * @param spinner = (Element) Loading
 * @param request = (Element) Výspis pro stav requestu
 * @param token = (String) Token pro poslání POSTem
 */
function editSetting(element, id, element_type, spinner, request, token){


    spinner.removeAttribute("hidden");
    request.setAttribute("hidden", "");

    if(token == undefined){
        token =  document.querySelectorAll("input[name='_token']")[0].value;
    }

    $.ajax({
        url: '/edit_setting/'+ element_type + "/" + id,
        method: 'get',
        success:function(response){

            spinner.setAttribute("hidden", "");

            setTimeout(function (){
                document.getElementsByClassName("su-dragable")[0].setAttribute("id","su-dragable")
                dragElement(document.getElementById("su-dragable"))
            },50)


            Swal.fire({
                html: response,
                showCloseButton: false,
                showCancelButton: false,
                showConfirmButton: true,
                showDenyButton: true,
                confirmButtonText: `Uložit`,
                denyButtonText: `Zrušit`,
                focusConfirm: false,
                customClass: 'su-dragable',
                backdrop: `
                            rgba(0,0,0,0)
                            left top
                            no-repeat
                          `
            }).then((result) => {
                if (result.isConfirmed) {

                    // $.ajax({
                    //     url: '/save_rule',
                    //     type: 'post',
                    //     data: { _token: token, table_name: element_type, id: id, key_type: key_type, key: key},
                    //     success:function(response){
                    //         spinner.setAttribute("hidden", "");
                    //         Swal.fire({
                    //             icon: 'success',
                    //             title: 'Uloženo',
                    //             text: 'Pravidlo bylo úspěšně nastaveno!',
                    //         })
                    //
                    //     },
                    //     error: function (response){
                    //         console.log(response);
                    //         let err = IsJsonString(response.responseText)? JSON.parse(response.responseText).messages : response.responseText
                    //         Swal.fire({
                    //             icon: 'error',
                    //             title: 'Hmm... CHYBA!',
                    //             text: err ,
                    //             customClass: {
                    //                 container: 'su-shake-horizontal',
                    //             }
                    //         })
                    //         spinner.setAttribute("hidden", "");
                    //
                    //     }
                    // });

                }
            })
        },
        error: function (response){
            console.log(response);
            let err = IsJsonString(response.responseText)? JSON.parse(response.responseText).messages : response.responseText
            Swal.fire({
                icon: 'error',
                title: 'Hmm... CHYBA!',
                text: err ,
                customClass: {
                    container: 'su-shake-horizontal',
                }
            })
            request.removeAttribute("hidden");
            spinner.setAttribute("hidden", "");
            request.innerHTML = '<b>&#x2715;</b>';

            setTimeout(function (request){
                request.setAttribute("hidden", "");
            },1000,request);
        }
    });
}

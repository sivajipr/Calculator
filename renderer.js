var total = 0;
var previous_operation;
$("#add").on('click', function(event){
    let number = $("#space").val()
    console.log(number);
    previous_operation = 'add'
    total = total + parseInt(number);
})

$("#equal").on('click', function(event){
    if (previous_operation == 'add'){
        let number = $("#space").val()
        total = total + parseInt(number);
    }
    console.log("total is", total);
    $('#space').val(total);
})

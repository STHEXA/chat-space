$(function(){

  $('#edit_group_1').on('keyup', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = 'http://localhost:3000/users';
    
    $.ajax({
      url: href,
      type: 'GET',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      
    })
    
  });
});
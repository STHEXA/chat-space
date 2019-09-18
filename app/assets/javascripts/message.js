$(function(){

  function buildHTML(message){
    var content = message.content ? `<p class='lower-message__content'> ${message.content} </p>` : '';
    var image = message.image ? `<img class="lower-message__image" src="${message.image}" alt="image" />` : '';
    var html = `<div class='message' data-id= '${message.id}'>
                  <div class='upper-message'>
                    <div class='upper-message__user-name'>
                      ${message.user_name}
                    </div>
                    <div class='upper-message__date'>
                      ${message.created_at}
                    </div>
                  </div>
                  <div class='lower-message'>
                      ${content}
                      ${image}
                  </div>
                </div>`
    return html;
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = window.location.href;
    $.ajax({
      url: href,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $('.form-container__btn').removeAttr('disabled');
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      alert("erorr");
    })
  });

  if(document.URL.match(/messages/)){
    var reloadMessages = function() {

      last_message_id = $('.message:last').data('id');
      $.ajax({
        url: 'api/messages',
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {

        var insertHTML = '';
        messages.forEach(function(message) {
          insertHTML = buildHTML(message);
        });
        $('.messages').append(insertHTML);
        if (insertHTML != '') {
          $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        };

      })
      .fail(function() {
        alert("自動更新に失敗しました。");
      });

    };
    setInterval(reloadMessages, 5000);
  };
});
$(function(){

  function buildHTML(message){
    if( (message.content　!= "") && (message.image != null) ){
      var html = `<div class='message'>
                    <div class='upper-message'>
                      <div class='upper-message__user-name'>
                        ${message.user_name}
                      </div>
                      <div class='upper-message__date'>
                        ${message.created_at}
                      </div>
                    </div>
                    <div class='lower-message'>
                      <p class='lower-message__content'>
                        ${message.content}
                      </p>
                      <img class="lower-message__image" src="${message.image}" alt="Sample" />
                    </div>
                  </div>`
      return html;
    }else if((message.content　!= "") && (message.image == null)) {
      var html = `<div class='message'>
                    <div class='upper-message'>
                      <div class='upper-message__user-name'>
                        ${message.user_name}
                      </div>
                      <div class='upper-message__date'>
                        ${message.created_at}
                      </div>
                    </div>
                    <div class='lower-message'>
                      <p class='lower-message__content'>
                        ${message.content}
                      </p>
                    </div>
                  </div>`
      return html;
    }else if((message.content　== "") && (message.image != null)) {
      var html = `<div class='message'>
                    <div class='upper-message'>
                      <div class='upper-message__user-name'>
                        ${message.user_name}
                      </div>
                      <div class='upper-message__date'>
                        ${message.created_at}
                      </div>
                    </div>
                    <div class='lower-message'>
                      <p class='lower-message__content'>
                      <img class="lower-message__image" src="${message.image}" alt="Sample" />
                      </p>
                    </div>
                  </div>`
      return html;
    }
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
      $('.messages').append(html)
      $('#message_content').val('')
    })
    .fail(function(){
      alert(erorr);
    })
  });
})
$(function(){

  var user_list = $("#user-search-result");
  function appendUser(user){
    
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    user_list.append(html);
  };

  $('#user-search-field').on('keyup', function(){
    var input = $("#user-search-field").val();
    
    $.ajax({
      url: '/users',
      type: 'GET',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
      users.forEach(function(user){
          appendUser(user);
      });
    })
    .fail(function() {
      alert("ユーザー検索に失敗しました");
    })
    
  });

  $(document).on("click",".user-search-add.chat-group-user__btn.chat-group-user__btn--add",function(){
    console.log(document);
  });

});
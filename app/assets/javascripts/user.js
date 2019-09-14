$(function(){

  var user_list = $('#user-search-result');
  function appendUser(user){
    
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    user_list.append(html);
  };

  var member_list = $('#member-result');
  function appendMember(member){
    var html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${$(member).attr('data-user-id')}'>
                  <p class='chat-group-user__name'>${$(member).attr('data-user-name')}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    member_list.append(html);
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

  $(document).on("click",'.chat-group-user__btn--add',function(){
    var selectUser = $(this).parent();
    $(selectUser).remove();
    appendMember(this);
  });

  $(document).on("click",'.js-remove-btn',function(){
    var selectUser = $(this).parent();
    $(selectUser).remove();
  });


});
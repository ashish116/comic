// var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
// db.transaction(function(tx){
//   tx.executeSql('create table if not exists student(email varchar(20), password varchar(10))');
//   tx.executeSql('insert into student values(\'kd@gmail.com\', \'kd123\')');
//   tx.executeSql('insert into student values(\'kd2@gmail.com\', \'kd1234\')');
// });


// var getAll = function(name){
//   db.transaction(function(tx){
//     tx.executeSql('select * from student', [], function(tx, results){
//       var len = results.rows.length, found = false;
//       for(var i = 0; i < len; i++){
//         if(name == results.rows.item(i).email){
//           found = true;
//           toPass(name);
//           break;
//         }
//       }
//       if(!found){
//         cantPass();
//       }
//     });
//   });
//   // console.log(result);
// }


document.querySelector('.input-wrap').addEventListener('click', function(e){
  console.log(this);
  this.classList.add('focused', 'no-place');
  document.querySelector('.input-wrap input').focus();
});

document.querySelectorAll('.input-wrap')[1].addEventListener('click', function(e){
  console.log(this);
  this.classList.add('focused', 'no-place');
  document.querySelectorAll('.input-wrap input')[1].focus();
});

document.querySelector('.input-wrap input').addEventListener('click', function(e){
  e.preventDefault();
});

document.querySelectorAll('.input-wrap input')[1].addEventListener('click', function(e){
  e.preventDefault();
});

document.querySelector('.input-wrap input').addEventListener('blur', function(e){
  e.preventDefault();
  if(e.currentTarget.value == ''){
    document.querySelectorAll('.input-wrap')[1].classList.remove('focused', 'no-place');
  }
  else{
    document.querySelectorAll('.input-wrap')[1].classList.remove('focused');
  }
});


document.querySelectorAll('.input-wrap input')[1].addEventListener('blur', function(e){
  e.preventDefault();
  if(e.currentTarget.value == ''){
    document.querySelector('.input-wrap').classList.remove('focused', 'no-place');
  }
  else{
    document.querySelector('.input-wrap').classList.remove('focused');
  }
});

// document.querySelector('.upper:nth-child(1) .next-but').addEventListener('click', function(e){
//   document.querySelector('.cover-upper').classList.add('to-pass');
// });
function cantPass(){
  $('.upper:nth-child(1) .input-wrap').trigger('click');
  document.querySelector('.upper:nth-child(1) .input-wrap').classList.add('error');
  document.querySelector('.upper:nth-child(1) .error-text').innerHTML = 'Couldn\'t find your Google Account';
}

function cantLog(){
  $('.upper:nth-child(2) .input-wrap').trigger('click');
  document.querySelector('.upper:nth-child(2) .input-wrap').classList.add('error');
  document.querySelector('.upper:nth-child(2) .error-text').innerHTML = 'Wrong password. Try again';
}

function toPass(name){
  document.querySelector('.upper:nth-child(1) .input-wrap').classList.remove('error');
  document.querySelector('.upper:nth-child(2) .dynamic-text .dyn-span').innerHTML = name;
  document.querySelector('.cover-upper').classList.add('to-pass');
  window.setTimeout(function(e){
    $('.upper:nth-child(2) .input-wrap').trigger('click');
  }, 350);
  // $('.upper:nth-child(2) .input-wrap').trigger('click');
}

document.querySelector('.upper:nth-child(2) .to-em').addEventListener('click', function(e){
  document.querySelector('.cover-upper').classList.remove('to-pass');
  document.querySelector('.input-wrap input').value = '';
  $('.upper:nth-child(1) .input-wrap').trigger('click');
  
});

var user, pass;

document.querySelector('.upper:nth-child(1) .next-but').addEventListener('click', function(e){
  // console.log('done');
  user = document.querySelector('.input-wrap input').value;
  $.ajax({
    type: "POST",
    url: "include/user.php",
    datatype: 'json',
    data: {'name': user},
    success: function( msg ) {
      console.log(msg);
      msg = JSON.parse(msg);
      if(msg.data){
        toPass(user);
      }
      else{
        cantPass();
      }
    }
  });
  // getAll(user);


});


document.querySelector('.upper:nth-child(2) .next-but').addEventListener('click', function(e){

  if(document.querySelector('.cover-upper').classList.contains('to-pass')){

    
    // console.log('done');
    pass = document.querySelectorAll('.input-wrap input')[1].value;
    console.log('user: ' + user + '        pass: ' + pass);
    $.ajax({
      type: "POST",
      url: "include/pass.php",
      datatype: 'json',
      data: {'pass': pass},
      success: function( msg ) {
        msg = JSON.parse(msg);
        console.log(msg);
        if(msg.data){
          document.location.href = "../comp.html?logi=y&uid=" + user;
          console.log(pass);         
        }
        else{
          cantLog();
        }
      }
    });
    // getAll(user);

  }

});
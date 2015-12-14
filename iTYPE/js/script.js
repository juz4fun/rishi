var aaronSw = "Think deeply about things. Don’t just go along because that’s the way things are or that’s what your friends say. Consider the effects, consider the alternatives, but most importantly, just think."
var splitstr = aaronSw.split('');
timeInterval = 100;

i = 0;

function type(){
  if(i<splitstr.length){
    $('.text').append(splitstr[i]);
    i++;
    setTimeout(function () {
      type();
    }, timeInterval);
  }else{
    
  }
}

type();

$('button').click(function(){
  i = 0;
  str = $('input').val();
  splitstr = str.split('');
  $('.text').text('');
  type();
});
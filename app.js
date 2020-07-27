$(() => {
  //Name In
  $('.name').slideDown('slow').removeClass('hidden');

  //AboutMe Toggle
  $('#aboutMeToggle').click(function (){
    $('.aboutMe').slideToggle().toggleClass('hidden');
  });

  //Projects Toggle
  $('#projectToggle').click(function (){
    $('.proj').slideToggle().toggleClass('hidden');
  });
}); //end onready
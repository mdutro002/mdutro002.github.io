$(() => {
  //Name In
  $('.name').slideDown('slow').removeClass('hidden');
  $('.aboutMe').slideToggle('slow').toggleClass('hidden');

  //AboutMe Toggle
  $('#aboutMeToggle').click(function (){
    $('.aboutMe').slideToggle().toggleClass('hidden');
  });

  //Projects Toggle
  $('#projectToggle').click(function (){
    $('.proj').slideToggle().toggleClass('hidden');
  });

  //Resume Toggle
  $('#resumeToggle').click(function(){
    $('.resume').slideToggle().toggleClass('hidden');
  })
}); //end onready
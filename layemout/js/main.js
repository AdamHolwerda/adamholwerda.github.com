/* Author:
Adam Holwerda
*/

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function initRows(){

$('#layoutContainer .page-row').each(function(){
var a = $(this).index()+1;
$(this).attr('data-order', a); // give every row a data-order, so we can make them sortable later

var widthOfPage = $('.page').width(), //make row height based on comic book aspect ratio
convertToHeight = widthOfPage / .666,
getaThird = Math.round(convertToHeight/3);

$(this).height(getaThird).resizable({handles:'s'}); //make the row resizable up and down

});

}

function alertSelect(){alert('You gotta select a panel first, bro'); }

function refreshInputs(){ //every time we select a panel, fill the text inputs with the correct stuff
var a = $('.selectify'), //panel
b = $('.selectify img'), //panel's image
c = b.attr('data-original-width'), //image's original width
d = b.width(), //get the image's current width
e = b.css('rotate'), //image's rotation
g = b.attr('src'); //image's source

$('#scale').val(Math.round((d/c)*100)/100);
$('#rotate').val(e);
$('#source').text(g);
}

function initPanels(){

$('#layoutContainer .panel').each(function(){ //for every panel, set up event handlers
var current = $(this);

current.click(function(){
   $('.panel.selectify').removeClass('selectify'); //deselect all others

  
current.addClass('selectify');

refreshInputs();

}).dblclick(function(){
	var a = current.index('#layoutContainer .panel'),
	b = eval(a+1);
	launchEditor(b); //this would be where we'd launch the image-editor / drawing program
});

var ratio = current.width()/current.height(); //get aspect ratio, not sure what this is used for yet

current.attr('data-aspect', ratio).attr('data-original-width', current.width());

});

}

function launchEditor(which){
console.log('the editor for '+which+' has been launched.'); //dummy console log

}

function wallyWood(){ //give each panel an initial image based on one of Wally Wood's 22 panels

$('#layoutContainer .panel').each(function(){
	if ($(this).find('img').length<1){
	var current = $(this),
	array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
	num = Math.floor(Math.random() * array.length),
	roll = array.splice(num, 1);

current.html("<img src = 'http://adamholwerda.com/layemout/wallywood/"+roll+".png' /> ");

}
});

}

function bindUI(){

$('.ui-resizable').resizable('destroy'); //get rid of ui-resizable();

$('#layoutContainer .panel').each(function(){
var current = $(this);
	current.resizable({handles:'e, se, s'}); //re-initiate resizable()
	current.find('img').draggable({ //initiate draggable() for images within panels
   start: function(event, ui) { $('.selectify').removeClass('selectify');
  
   $(this).parent().addClass('selectify'); //every time we start dragging an image, the parent panel should be selected

	refreshInputs(); //since there's a new selection, we have to reset the inputs

}
});

});
}

function init(){ //basic page setup stuff

var clientHeight = $(window).height(),
clientWidth = $(window).width(),
menuWidth = $('#menuRight').width();

$('#stageLeft').width(clientWidth-menuWidth);

$(window).resize(function(){
var clientHeight = $(window).height(),
 clientWidth = $(window).width();

console.log(clientWidth+'px by '+clientHeight+'px');
$('#stageLeft').width(clientWidth-menuWidth);

	$('#layoutContainer .page-row').each(function(){

var widthOfPage = $('.page').width(), //make row height
convertToHeight = widthOfPage / .666,
getaThird = Math.round(convertToHeight/3);

$(this).height(getaThird).resizable({handles:'s'});

});

});

$('.choose').each(function(){ //setting up the project template picker
var current = $(this),
 loadType = current.attr('data-type');
$('[data-type="'+loadType+'"]').load('templates/template.html #'+loadType, function(){

var a = $('[data-type="'+loadType+'"] .panel'),
b = a.width();

if (loadType == 'page' || loadType =='spread'){ b = b/2.6+b; }

$('#'+loadType).removeAttr('id');
$('[data-type="'+loadType+'"] .panel').height(b);

$('[title]').tooltip();

});

});

$('.choose').bind('touchstart', function(){

 $(this).trigger('click');

});

}

$(document).ready(function(){

init();

var project = {};

$('#projTitle').keyup(function(){
var a = $(this).val();
project.title = a;
$('#stageLeft .title').text(project.title);
});

$('.choose').click(function(){

project.type = $(this).attr('data-type');
$('#menuRight').addClass('slide');
$('#layoutContainer').attr('data-type', project.type).load('templates/template.html #'+project.type, function(){

initRows();
initPanels();
wallyWood();
bindUI();

$("img").one('load', function() {

var a = $(this);
 myOrigWidth = a.width();
 a.attr('data-original-width', myOrigWidth).css('rotate', '0deg');

}).each(function() {
  if(this.complete) $(this).load();
});


});

});

$('#duplicate').click(function(){
if ($('.selectify').length < 1){ alertSelect(); } else {
var a = $('.selectify'),
b = a.find('img').clone(),
c = a.clone();
c.empty().removeClass('selectify').removeClass('ui-resizable');
c.insertAfter('.selectify').html(b).resizable({handles:'e, se, s'});

c.find('img').draggable();

c.click(function(){
   $('.panel.selectify').removeClass('selectify'); //deselect all others
c.addClass('selectify');

}).dblclick(function(){
	var a = current.index('#layoutContainer .panel'),
	b = eval(a+1);
	launchEditor(b);
});


}
});

$('#deletify').click(function(){
if ($('.selectify').length < 1){ alertSelect(); }else{
$('.selectify').remove();
}
});

$('#wallywood').click(function(){
	if ($('.selectify').length < 1){ alertSelect(); } else {
var array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
 num = Math.floor(Math.random() * array.length),
 roll = array.splice(num, 1);
$('.selectify img').attr('src', 'http://adamholwerda.com/layemout/wallywood/'+roll+'.png');
}
});

$('#openPixlr').click(function(){
if ($('.selectify').length < 1){ alertSelect(); }else {
var a = $('.selectify img').attr('src');
$(this).attr('target','_blank').attr('href','http://pixlr.com/editor?image='+a).trigger('click');
}
});

$('#source').keyup(function(){
	if ($('.selectify').length < 1){ alertSelect(); }else {

var a = $(this).val();
$('.selectify').find('img').attr('src', a);
}
});

$('#scale').keyup(function(){
	if ($('.selectify').length < 1){ alertSelect(); }else {

var a = $(this).val(),
b = $('.selectify img'),
c = b.attr('data-original-width');

if (isNumber(a)){
	b.width(c*a);
} else {
	b.width(c);
}
}
});

$('#rotate').keyup(function(){
	if ($('.selectify').length < 1){ alertSelect(); } else {

var a = $(this).val(),
b = $('.selectify img');

	b.css('rotate',a);
}
});


$('#flipperX').click(function(){
	if ($('.selectify').length < 1){ alertSelect(); } else {

var b = $('.selectify img');

	b.css('rotateX','+=180deg');
}
});


$('#flipperY').click(function(){
	if ($('.selectify').length < 1){ alertSelect(); } else {

var b = $('.selectify img');

	b.css('rotateY','+=180deg');
}
});

$('#loadNewRow').click(function(){
if ($('.selectify').length < 1){ alertSelect(); } else {
array = [1,2,3,4,5,6],
num = Math.floor(Math.random() * array.length),
roll = array.splice(num, 1);

$('.selectify').parent().load('templates/template.html #r'+roll, function(data){
	initRows();
	initPanels();
	wallyWood();

$(".loaded .panel img").one('load', function() {

var a = $(this);
 myOrigWidth = a.width();
 a.attr('data-original-width', myOrigWidth).css('rotate', '0deg');

}).each(function() {
  if(this.complete) $(this).load();
});

$('.loaded .panel:first').addClass('selectify').unwrap('.loaded');

bindUI();


});

}

});

});


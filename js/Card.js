var uniqueCardIDs = [];
function Card(id, color, character){
	this.color = color;
	this.character = character;
	this.ID = id;
	this.content = '<span style="color:#' + color + '">' + character + '</span>';
	var DOMElement;
}
Card.prototype.isMatch = function(otherCard){
	return (this.color == otherCard.color && this.character == otherCard.character);
};
Card.prototype.GetDOMElement = function(){
		return $('#card' + this.ID);
};
Card.prototype.Select = function(){
	this.GetDOMElement().find('.card-front').show();
	this.GetDOMElement().find('.card-back').hide();
	this.GetDOMElement().addClass('pendingMatch');
};
Card.prototype.RevealCorrectMatch = function(prevSelectedCard){
	this.GetDOMElement().find('.card-front').show();
	this.GetDOMElement().find('.card-back').hide();
	this.GetDOMElement().addClass('correctMatch');
	prevSelectedCard.GetDOMElement().removeClass('pendingMatch').addClass('correctMatch');
};
Card.prototype.RevealIncorrectMatch = function(prevSelectedCard){
	this.GetDOMElement().find('.card-front').show();
	this.GetDOMElement().find('.card-back').hide();
	this.GetDOMElement().addClass('wrongMatch');
	prevSelectedCard.GetDOMElement().removeClass('pendingMatch').addClass('wrongMatch');
};
Card.prototype.Reset = function(){
        if(this.GetDOMElement().hasClass('correctMatch')){
            this.GetDOMElement().addClass('matched');
        }
	this.GetDOMElement().removeClass('correctMatch').removeClass('wrongMatch');
	this.GetDOMElement().find('.card-front').hide();
	this.GetDOMElement().find('.card-back').show();
};

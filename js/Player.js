var uniquePlayerIDs = [];

function Player(id, name){
	this.name = name;
	this.ID = id;
	this.score = 0;
}
Player.prototype.AddPoints = function(numPoints){
	this.score += numPoints;
	this.GetDOMElement().find('.playerScore').text(this.score);
};
Player.prototype.GetDOMElement = function(){
	return $('#player' + this.ID);
};
Player.prototype.EndTurn = function(){
	this.GetDOMElement().removeClass('currentPlayer');
};
Player.prototype.BeginTurn = function(){
	this.GetDOMElement().addClass('currentPlayer');
};
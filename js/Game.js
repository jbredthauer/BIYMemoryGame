function Game(){
	this.players = [];
	this.cards = [];
	this.currentPlayer = null;
	this.pendingMatchCard = null;
        this.turnFinished = false;
}
Game.prototype.start = function(numPlayers, numCards, maxScore){
	var self = this;
	
	// Create players
	this.players.push(new Player(1, "Player 1"));
	this.players.push(new Player(2, "Player 2"));
	
	// Add to scoreboard
	this.RenderScoreboard();
	
	// Create cards
	for(i = 0; i < numCards; i++){
		if( i % 2 == 0){
			this.cards.push(new Card(i, "000000", i / 2));
		}else{
			this.cards.push(new Card(i, "000000", (i - 1) / 2));
		}
	}
	
        // Randomize the order here
        
	// Add to playing area
	this.RenderPlayingArea();
	
	// Wire up click handlers
	$('.card').click(function(){
		if(!$(this).find('.card-front').is(':visible') && !$(this).hasClass('matched') && !self.turnFinished){
		
			// find card object corresponding to card that was clicked
			var clickedCard;
			for(card in self.cards){
				if('card' + self.cards[card].ID == $(this).attr('id')){
					clickedCard = self.cards[card];
				}
			}
			
			// If it's the first card to be selected, call its Select method.
			// Otherwise check to see if it's a correct match- if so, call RevealCorrectMatch.
			// If not, call RevealIncorrectMatch.
			if(!self.pendingMatchCard){
				self.pendingMatchCard = clickedCard;
				clickedCard.Select();
			}else{
                            self.turnFinished = true;
				if(clickedCard.isMatch(self.pendingMatchCard)){
					clickedCard.RevealCorrectMatch(self.pendingMatchCard);
					self.currentPlayer.AddPoints(1);
					window.setTimeout(self.StartNextTurn, 2000, self);
				}else{
					clickedCard.RevealIncorrectMatch(self.pendingMatchCard);
					window.setTimeout(self.StartNextTurn, 2000, self);
				}
			}
			
		}
	});
	
	// Start first turn
	this.currentPlayer = this.players[0];
	this.currentPlayer.BeginTurn();
};
Game.prototype.RenderScoreboard = function(){
	var playerTemplate = $('#playerTemplate').html();
	var rendered = Mustache.render(playerTemplate, this);
	$('#scoreboard').html(rendered);
};
Game.prototype.RenderPlayingArea = function(){
	var cardTemplate = $('#cardTemplate').html();
	var rendered = Mustache.render(cardTemplate, this);
	$('#playingArea').html(rendered);
};
Game.prototype.StartNextTurn = function(game){
	// Make it the next player's turn
	// TO-DO: change this method to support more than two players
	game.currentPlayer.EndTurn();
	if(game.currentPlayer.ID == game.players[0].ID){
		game.currentPlayer = game.players[1];
	}else{
		game.currentPlayer = game.players[0];
	}
	game.currentPlayer.BeginTurn();
	
	// Reset all the cards
	game.pendingMatchCard = null;
	for(card in game.cards){
		game.cards[card].Reset();
	}
        game.turnFinished = false;
}
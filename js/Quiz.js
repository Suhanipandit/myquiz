class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    question.hide()
    background("blue")
    fill("black")
    textSize(30)
    text("Result Of The Quiz",340,50)
    Contestant.getPlayerInfo()
    if(allContestants!==undefined){
      debugger
      var y=230
      fill("black")
      textSize(20)
      text("*NOTE:Contestant who answered correct are highlighted in green colour",130,230)
      for(var plr in allContestants){
        debugger
        var correct="2"
        if(correct===allContestants[plr].answer){
          fill("green")
        }else{fill("red")}
        y=y+30
        textSize(20)
        text(allContestants[plr].name+": "+ allContestants[plr].answer,250,y)
      }
    }
  }

}

// start slingin' some d3 here.


var enemyData = [];
var radius = 10;
var svg = d3.select("svg");
var drag = d3.behavior.drag();
var color = d3.scale.category10();

var highScore = 0;
var currentScore = 0;
var numOfCollisions = 0; 


var getPosition = function(){
  var position = {};

  position.x = Math.random() * 500;
  position.y = Math.random() * 500;
  return position;
}

var populateEnemyData = function(n){
  for(var i = 0; i < n; i++){
    enemyData.push(getPosition());
  }
}


var initialize = function(n) {
  populateEnemyData(n);

  svg.selectAll("image")
    .data(enemyData)
    .enter()
    .append("image")
    .attr("class", "enemy")
    .attr("x", function(d){
      return d.x;
    })
    .attr("y", function(d){
      return d.y;
    })
    // .attr("r", radius)
    .attr("width", 2 * radius)
    .attr("height", 2 * radius)
    .attr("xlink:href", "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Fuuma_Shuriken.svg/525px-Fuuma_Shuriken.svg.png")
    // .attr("fill", function(d, i){
    //   return color(i % 4);
    // })
    // .attr("stroke", function(d, i){
    //   return color((i - 2) % 4);//color((i + 1) % 4);
    // })
    // .attr("stroke-width", 2);

  svg.selectAll(".player")
    .data([{x: 250, y: 250}])
    .enter()
    .append("circle")
    .attr("class", "player")
    .attr("cx", function(d) {
      return d.x;
    })
    .attr("cy", function(d) {
      return d.y;
    })
    .attr("r", radius)
    .attr("fill", "#000")
    .attr("stroke", "#636363")
    .attr("stroke-width", 2);

};

var translate = function() {
  svg.selectAll(".enemy")
    .transition()
    .duration(1000)
    .attr("x", function(d) {
      d.x = Math.random() * 500;
      return d.x;
    })
    .attr("y", function(d) {
      d.y = Math.random() * 500;
      return d.y;
    });
  d3.timer(translate, 1500);
  return true;  
};

var onDragDrop = function(clickHandler){
  drag.on("drag", clickHandler);
  return drag;
};

var dragClick = function(d){
  if ((d3.event.x > radius && d3.event.x < 500 - radius) && (d3.event.y > radius && d3.event.y < 500 - radius)) {
    d3.select(this)
      .attr("cx", d.x = d3.event.x)
      .attr("cy", d.y = d3.event.y);
    
  } 
};

var determineCollision = function() {
  var playerPosX = +svg.select(".player").attr("cx");
  var playerPosY = +svg.select(".player").attr("cy");
  var diameter = 2 * radius;
  svg.selectAll(".enemy").each(function() {
    var enemy = d3.select(this);
    var enemyX = +enemy.attr('x');
    var enemyY = +enemy.attr('y');
    var diffX = (enemyX + radius) - playerPosX;
    var diffY = (enemyY + radius) - playerPosY;
    if (Math.sqrt(diffX * diffX + diffY * diffY) < diameter) {
      // handle scoring
      
      if(highScore < currentScore){
        highScore = currentScore;
        d3.select(".high > span").text(highScore);
      }
      if(currentScore > 5) {
        // flash background
        svg.style("background-color", "rgba(255, 20, 30, 0.7)");
        d3.timer(function() {
          svg.style("background-color", "white");
          return true;
        }, 100);


        numOfCollisions++;
        d3.select(".collisions > span").text(numOfCollisions);
      }
      currentScore = 0;
      
    }
  });

  d3.timer(determineCollision, 10);
  return true;
};

var increaseScore = function(){
  currentScore++;
  d3.select(".current > span").text(currentScore);
  d3.timer(increaseScore, 100);
  return true;
};


initialize(15);
d3.timer(translate, 1000);
d3.timer(determineCollision, 10);
d3.timer(increaseScore, 100);
svg.selectAll(".player").call(onDragDrop(dragClick));


















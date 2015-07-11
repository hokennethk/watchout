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

  position.x =  Math.random() * 500;
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

  svg.selectAll("circle")
    .data(enemyData)
    .enter()
    .append("circle")
    .attr("class", "enemy")
    .attr("cx", function(d){
      return d.x
    })
    .attr("cy", function(d){
      return d.y;
    })
    .attr("r", radius)
    .attr("fill", function(d, i){
      return color(i % 4);
    })
    .attr("stroke", function(d, i){
      return color((i - 2) % 4);//color((i + 1) % 4);
    })
    .attr("stroke-width", 2);

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
    .attr("cx", function(d) {
      d.x = Math.random() * 500;
      return d.x;
    })
    .attr("cy", function(d) {
      d.y = Math.random() * 500;
      return d.y;
    });
};

var onDragDrop = function(clickHandler){
  drag.on("drag", clickHandler);
  return drag;
};

var dragClick = function(d){
  d3.select(this)
    .attr("cx", d.x = d3.event.x)
    .attr("cy", d.y = d3.event.y);
};

var determineCollision = function() {
  var playerPosX = svg.select(".player").attr("cx");
  var playerPosY = svg.select(".player").attr("cy");
  var diameter = 2 * radius;
  svg.selectAll(".enemy").each(function() {
    var enemy = d3.select(this);
    if (Math.sqrt(Math.pow(playerPosX - d3.select(this).attr("cx"), 2) + Math.pow(playerPosY - d3.select(this).attr("cy"), 2)) < diameter) {
      // handle scoring
      
      if(highScore < currentScore){
        highScore = currentScore;
        d3.select(".high > span").text(highScore);
      }
      if(currentScore > 10) {
        numOfCollisions++;
        d3.select(".collisions > span").text(numOfCollisions);
      }
      currentScore = 0;
      
    }
  });
};

var increaseScore = function(){
  currentScore++;
  d3.select(".current > span").text(currentScore);
};


initialize(10);

// svg.selectAll(".player").on("mousemove", function() {

//   var position = d3.mouse(this);
//   svg.selectAll(".player")
//     .attr("cx", position[0])
//     .attr("cy", position[1]);
// });


// console.log(svg.selectAll("circle"));
setInterval(translate, 1000);
setInterval(determineCollision, 10);
setInterval(increaseScore, 100);
svg.selectAll(".player").call(onDragDrop(dragClick));


















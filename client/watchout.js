// start slingin' some d3 here.


var enemyData = [];

var svg = d3.select("svg");
var drag = d3.behavior.drag();



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
    .attr("r", 10)
    .attr("fill", "#ff7373")
    .attr("stroke", "red")
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
    .attr("r", 10)
    .attr("fill", "#0af")
    .attr("stroke", "blue")
    .attr("stroke-width", 2);

};

var translate = function() {
  svg.selectAll(".enemy")
    .transition()
    .duration(700)
    .attr("cx", function(d) {
      return Math.random() * 500;
    })
    .attr("cy", function(d) {
      return Math.random() * 500;
    });
};

var onDragDrop = function(clickHandler, dropHandler){
  drag.on("drag", clickHandler)
    .on("dragend", dropHandler)
  return drag;
};

var dragClick = function(d){
  d3.select(this)
    .attr("cx", d.x = d3.event.x)
    .attr("cy", d.y = d3.event.y);
};

var dragDrop = function(d){
  alert('dropped');
};




initialize(30);





// svg.selectAll(".player").on("mousemove", function() {

//   var position = d3.mouse(this);
//   svg.selectAll(".player")
//     .attr("cx", position[0])
//     .attr("cy", position[1]);
// });


// console.log(svg.selectAll("circle"));
setInterval(translate, 700);

svg.selectAll(".player").call(onDragDrop(dragClick, dragDrop));


















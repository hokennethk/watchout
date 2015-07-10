// start slingin' some d3 here.


var enemyData = [];

var svg = d3.select("svg");

var getPosition = function(){
  var position = {};

  position.x =  Math.random() * 500;
  position.y = Math.random() * 500;
  return position;
}

var populateEnemyData = function(n){
  for(var i = 0; i <= n; i++){
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


}

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

initialize(20);
console.log(svg.selectAll("circle"));
setInterval(translate, 700);























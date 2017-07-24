/* global d3 width height */

let fill = d3.scaleOrdinal(d3.schemeCategory20)
let leaderScale = d3.scaleLinear()
  .range([5, 40])

const draw = (words) => {
  // Draw your data here...

  d3.select("#top-score").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height/ 2 + ")")
    .selectAll("text")
    .data(words)
    .enter().append("text")
    .style("font-size", function(d) { return d.size + "px"; })
    .style("font-family", "Impact")
    .style("fill", function(d, i) { return fill(i); })
    .attr("text-anchor", "middle")
    .attr("transform", function(d) {
      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    })
    .text(function(d) { return d.text; });
}


const load = () => {
  // Load your data here...
  d3.tsv('stats.tsv', function (data) {
    var namePlayer = data
      .filter(function (d) { return +d.G > 0 })
      .map(function (d) { return { text: d.Name, size: +d.G }})
      .sort(function(a, b){ return b.size - a.size })

    d3.layout.cloud().size([width, height])
      .words(namePlayer)
      .padding(0.5)
      .rotate(function () { return ~~(Math.random() * 3) * 90})
      .font("Impact")
      .fontSize(function (d) { return d.size })
      .on("end", draw)
      .start()
  })
}

load()

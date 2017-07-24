/* global d3 width height */

let fill = d3.scaleOrdinal(d3.schemeCategory20)
let leaderScale = d3.scaleLinear()
  .range([5, 40])
const draw = (words) => {
  // Draw your data here...
  d3.select("body").append("svg")
      .attr("width", layout.size()[0])
      .attr("height", layout.size()[1])
    .append("g")
      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
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

    d3.tsv("stats.tsv", (rows)=>{
      let datasetName = rows.map((i)=>{
        return {text: i.Name, size: i.G}
      })

      d3.layout.cloud()
        .size([500, 500])
        .words(datasetName)
        .padding(5)
        .rotate(function () { return ~~(Math.random() * 3) * 90})
        .font("Impact")
        .fontSize(function (d) { return d.size })
        .on("end", draw)
        .start()
    })
}

load()

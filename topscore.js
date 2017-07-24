/* global d3 width height */


let fill = d3.scaleOrdinal(d3.schemeCategory20)
let leaderScale = d3.scaleLinear()
  .range([5, 40])



const draw = (words) => {
  // Draw your data here...
  let dataset = words.map(x => {
    return {
      name: x.Name,
      goal: x.G
    }
  })

  let fill = d3.scaleOrdinal(d3.schemeCategory20)

  let colorScale = d3.scaleLinear()
  .domain([0, d3.max(dataset.map(x=> {
    return x.goal
  }))])
  .range(['white', 'red'])

  d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "wordcloud")
    .append("g")
    // without the transform, words words would get cutoff to the left and top, they would
    // appear outside of the SVG area
    .attr("transform", "translate(" + (width/2) +","+(height/2)+")")
    .selectAll("text")
    .data(words)
    .enter().append("text")
    .style("font-size", function(d) { return d.size + "px"; })
    .style('font-family', 'Sans')
    .style("fill", function(d, i) { return fill(i); })
    .attr('text-anchor', 'middle')
    .attr("transform", function(d) {
      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
    .text(function(d) { return d.text; });
}


const load = () => {
  // Load your data here...

  d3.tsv('stats.tsv', function (data) {
  var leaders = data
    .filter(function (d) { return +d.G > 0 })
    .map(function (d) { return { text: d.Name, size: +d.G }})
    .sort(function (a, b) { return d3.descending(a.size, b.size)})
    .slice(0, 100)

  d3.layout.cloud().size([width, height])
    .words(leaders)
    .padding(5)
    .rotate(function () { return ~~(Math.random() * 2) * 90})
    .font("Impact")
    .fontSize(function (d) { return d.size })
    .on("end", draw)
    .start()
  })
}

load()

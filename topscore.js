/* global d3 width height */
const width1 = 800,
      height1 = 300,
      margin1 = 20,
      marginLeft1 = 40;

let fill = d3.scaleOrdinal(d3.schemeCategory20)
let leaderScale = d3.scaleLinear()
  .range([5, 40])

const draw = (words) => {
  // Draw your data here...

  d3.select('#top-score')
  .append('svg')
  .attr('width', width1)
  .attr('height', height1)
  .attr('class', 'wordcloud')
  .append('g')
  //without the transform, words words would get cutoff to the left and top, they would 
  //appear outside of the SVG area
  .attr('transform', 'translate(320,200)')
  .selectAll('text')
  .data(words)
  .enter().append('text')
  .style('font-size', function(d) { return d.size + 'px'})
  .style('fill', function(d, i) { return fill(i); })
  .attr('transform', function(d) {
    return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
  })
  .text(function(d) { return d.text; });
}


const load = () => {
  // Load your data here...
  let data = [];
  d3.tsv('stats.tsv', rows => {
    data = rows.map(row => {
      return { "size": (row.G + 2), "text": row.Name }
    })
  })

  fill.domain(leaderScale);

  d3.layout.cloud().size([800, 300])
    .words(data)
    .rotate(0)
    .fontSize(function(d) { return d.size })
    .on('end', draw)
    .start();
}

load()

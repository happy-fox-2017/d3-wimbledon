/* global d3 width height */

let fill = d3.scaleOrdinal(d3.schemeCategory20)
let leaderScale = d3.scaleLinear()
  .range([5, 40])


const draw = (words) => {
  d3.select('#top-score')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate('+ width / 2 + ',' + height / 2 + ')')
    .selectAll('text')
    .data(words)
    .enter()
    .append('text')
    .style('font-size', (d) => {
      return d.size + 'px';
    })
    .style('font-family', 'Impact')
    .style('fill', (d,i) => {
      return fill(i)
    })
    .attr('text-anchor', 'middle')
    .attr('transform', (d) => {
      return 'translate(' + [d.x, d.y] +')rotate(' + d.rotate + ') '
    })
    .text((d) => {
      return d.text
    })
}


const load = () => {
  let topScorer = []
  d3.tsv('stats.tsv', (err, rows) => {
    if (err) {
      console.log('TSV parse error' + err)
    } else {
      rows.filter((row) => {
        return +row.G > 0
      })
      .map((row) => {
        topScorer.push({ text : row.Name.split(',').reverse().join(' '), size : +row.G})
      })
    }

    d3.layout.cloud()
    .size([width, height])
    .words(topScorer)
    .padding(5)
    .rotate(() => {
      return ~~(Math.random() * 2) * 90
    })
    .font('Impact')
    .fontSize((d) => {
      return d.size
    })
    .on('end', draw)
    .start()
  })
}

load()

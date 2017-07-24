/* global d3 */

// Our canvas
const width = 750,
      height = 300,
      margin = 20,
      marginLeft = 40

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background', '#cacaca')

// Data reloading
let reload = () => {
  let GoalsScored = []
  d3.tsv('afcw-results.tsv', function (err, rows) {
    if (err) {
      console.log('TSV parse error' + err)
    } else {
      rows.forEach((row) => {
        GoalsScored.push(row.GoalsScored)
      })
    }
    redraw(GoalsScored)
  })
}

// redraw function
let redraw = (data) => {
  let yScale = d3.scaleLinear()
    .domain([d3.min(data),d3.max(data)])
    .range([d3.min(data),d3.max(data)*50])

  let colorScale = d3.scaleLinear()
    .domain([d3.min(data),d3.max(data)])
    .range(['red','blue'])

  let barWidth = width / data.length

  svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('class', 'bar')
  .attr('fill', colorScale)
  .attr('x', (d, i) => {
    return i * barWidth
  })
  .attr('y', (d) => {
    return height - yScale(d)
  })
  .attr('width', width / data.length)
  .attr('height', (d) => {
    return yScale(d)
  })
}

reload()

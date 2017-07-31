let dataset = _.range(15).map(() => {
  return Math.random() * 50
})

const svg = d3.select('#results').append('svg')
  .attr('width', 400)
  .attr('height', 300)
  .style('background', '#cacaca')

const yScale = d3.scaleLinear()
  .domain([0, d3.max(dataset)])
  .range([0, 300])

const colorScale = d3.scaleLinear()
  .domain([0, d3.max(dataset)])
  .range(['peru', 'teal'])

const mouseover = (d, i) => {
  debugger
}

svg.selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
  .attr('class', 'bar')
  .attr('x', (d, i) => {
    return i * 22
  })
  .attr('y', (d) => {
    return 300 - yScale(d)
  })
  .attr('width', 20)
  .attr('height', (d) => {
    return yScale(d)
  })
  .attr('fill', colorScale)
  .on('mouseover', function (d, i) {
    d3.select(this).style('fill', '#bada55')
  })
  .on('mouseout', function (d, i) {
    d3.select(this).style('fill', colorScale(d))
  })
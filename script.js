/* global d3 */

// Our canvas
const width = 1000,
  height = 400,
  margin = 20,
  marginLeft = 60

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

  // .style('paddingLeft', marginLeft)
  .style('background', '#FAFAFA')
  .style('border', '1px solid black')
  .style('padding', '50px')
  .style('overflow', 'visible')

// Data reloading
let reload = () => {
  // Your data parsing here...
  d3.tsv('afcw-results.tsv', (rows) => {
    console.log(JSON.stringify(rows))
    redraw(rows)
  })
}

// redraw function
let redraw = (data) => {
  let dataset = []
  data.forEach(function (res) {
    dataset.push(res.GoalsScored)
  })

  const yScale = d3.scaleLinear()
  .domain([0, d3.max(dataset)])
  .range([0, height])

  const xScale = d3.scaleLinear()
  .domain([0, dataset.length])
  .range([0, width])

  const yAxisScale = d3.scaleLinear()
  .domain([d3.max(dataset), 0])
  .range([0, height])

  let colorScale = d3.scaleLinear()
  .domain([0, d3.max(dataset)])
  .range(['#64edbc', '#6495ed'])

  const yAxis = d3.axisLeft(yAxisScale).ticks(d3.max(dataset))
  const xAxis = d3.axisBottom(xScale).ticks(dataset.length)

  const trans = d3.transition().duration(300).ease(d3.easeLinear)

  svg.append('g')
   .call(yAxis)
   .attr('transform', 'translate(-2, 0)')

  svg.append('g')
   .call(xAxis)
    .attr('transform', 'translate(0, 400)')

  // Your data to graph here
  svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d, i) => xScale(i))
    .attr('y', () => height)
    .attr('width', margin)
    .attr('height', () => 0)
    .attr('fill', colorScale)
    .transition(trans).delay((d, i) => i * 100)
    .attr('height', (d) => yScale(d))
    .attr('y', (d) => height - yScale(d))

}

reload()

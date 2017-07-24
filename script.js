/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 20
marginLeft = 40

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background-image', 'url(https://drscdn.500px.org/photo/209832069/q%3D80_h%3D300/3a332948213c84d2a509d54ed3ca1d00)')
  .style('margin', margin)
  .style('margin-left', marginLeft)
  .style('overflow', 'inherit')

// Data reloading
let reload = () => {
  // Your data parsing here...
  d3.tsv('afcw-results.tsv', (rows) => {
    redraw(rows)
  })
}

// redraw function
let redraw = (data) => {
  // Your data to graph here
  let dataset = data.map(d => {
    return d.GoalsScored
  })

  let yScale = d3.scaleLinear()
  .domain([0, d3.max(dataset)])
  .range([0, height-50])

  let xScale = d3.scaleLinear()
  .domain([0, dataset.length])
  .range([0, width])

  let colorScale = d3.scaleLinear()
  .domain([0, d3.max(dataset)])
  .range(['white', 'red'])

  let yAxis = d3.axisLeft(d3.scaleLinear()
  .domain([d3.max(dataset), 0])
  .range([0, height-50])).ticks(d3.max(dataset))

  let xAxis = d3.axisBottom(xScale).ticks(dataset.length)

  let t = d3.transition()
  .duration(200)
  .ease(d3.easeLinear)

  svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('class', 'bar')
  .attr('x', (d, i) => {
    return xScale(i)
  })
  .attr('y', (d) => {
    return height
  })
  .attr('width', (d, i) => {
    return xScale(0.9)
  })
  .attr('height', (d, i) => {
    return 0
  })
  .attr('fill', (d, i) => {
    return 'darkgrey'
  })
  .transition(t)
  .delay((d,i) => {
    return i * 100
  })
  .attr('height', (d, i) => {
    return yScale(d.GoalsScored)
  })
  .attr('y', (d) => {
    return height - yScale(d.GoalsScored)
  })
  .style('fill', (d,i) => {
    return colorScale(dataset[i])
  })

  svg.append('g')
  .attr('transform', 'translate(0,300)')
  .call(xAxis)

  svg.append('g')
  .attr('transform', 'translate(0, 50)')
  .call(yAxis)
}

reload()

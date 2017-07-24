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

let afc = []





// Data reloading
let reload = () => {
  // Your data parsing here...
  d3.tsv("afcw-results.tsv", (data) => {
    // console.log(data);
    data.forEach(d => {
      afc.push(d.GoalsScored)
    })
    redraw(afc);
  })
}

// reload()

// redraw function
let redraw = (data) => {
  let yScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, height])

  let xScale = d3.scaleLinear()
    .domain([0, data.length])
    .range([0, width])

  console.log('data', data);
  // Your data to graph here
  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'goals-chart')
    .attr('x', (d, i) => {
      return xScale(i)
    })
    .attr('y', (d) => {
      return 300 - yScale(d)
    })
    .attr('width', 15)
    .attr('height', (d) => {
      return yScale(d)
    })
}

reload()

/* global d3 */

// Our canvas
const width = 700,
  height = 300,
  margin = 20
marginLeft = 40

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background','#ffffff')

// Data reloading
let reload = () => {
  // Your data parsing here...
  let data = []
  d3.tsv('afcw-results.tsv', (rows) => {
    rows.forEach(data_goalScored => {
      data.push(data_goalScored.GoalsScored)
    })
    redraw(data)
  })
}

// redraw function
let redraw = (data) => {
  // Your data to graph here
  const yScale = d3.scaleLinear()
  .domain([0,d3.max(data)])
  .range([0,height])
  
  const xScale = d3.scaleLinear()
  .domain([0,data.length])
  .range([0,width])
  
  svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('class','bar')
  .attr('x',(d,i)=>{
    return xScale(i)
  })
  .attr('y', (d) => {
    return 300 - yScale(d)
  })
  .attr('width', 10)
  .attr('height', (d) => {
    return yScale(d)
  })
  
  var y_axis = d3.axisLeft()
  .scale(yScale)
  .ticks(4)
  
  var x_axis = d3.axisBottom()
  .scale(xScale)
  .ticks(46)
  
  svg.append("g")
  .attr("transform", "translate(0,0)")
  .call(y_axis)
  
  svg.append("g")
  .attr("transform", "translate(0,300)")
  .call(x_axis)

}

reload()

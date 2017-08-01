/* global d3 */

// Our canvas
const width = 950,
  height = 300,
  margin = 20
marginLeft = 40

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background', '#cacaca')
  .style('padding', '29')

let t = d3.transition()
        .duration(300)
        .ease(d3.easeLinear)
// Data reloading
let reload = () => {
  // Your data parsing here...
  d3.tsv("afcw-results.tsv", (rows)=>{
    let dataset = rows.map((i)=>{
      return parseInt(i.GoalsScored)
    })
    redraw(dataset)
  })
}

// redraw function
let redraw = (dataset) => {
  // Your data to graph here
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, height])

  const yAxisScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([height, 0])

  const xAxisScale = d3.scaleLinear()
    .domain([0, dataset.length])
    .range([0, width])

  const colorScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range(['#87F8FF', '#452820'])

  const axisLeft = d3.axisLeft().scale(yAxisScale).ticks(4)
  const axisBottom = d3.axisBottom().scale(xAxisScale).ticks(46)


  svg.append("g")
  .attr("transform", "translate(0, 0)")
  .call(axisLeft)

  svg.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(axisBottom)

  svg.selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
  .attr('class', 'bar')
  .attr('x', (d, i)=>{
    return xAxisScale(i)
  })
  .attr('y', (d)=>{
    return height
  })
  .attr('width', 20)
  .attr('height', (d)=>{
    return 0
  })
  .transition(t)
  .delay((d, i)=>{
    return i*100
  })
  .attr('height', (d)=>{
    return yScale(d)
  })
  .attr('y', (d)=>{
    return height - yScale(d)
  })
  .attr('fill', colorScale)
  // .on('mouseover', (d, i)=>{
  //   d3.select(this).style('fill', '#bada55')
  // })
  // .on('mouseout', (d, i)=>{
  //   d3.select(this).style('fill', colorScale(d))
  // })
}

reload()

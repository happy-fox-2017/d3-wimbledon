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

// Data reloading
let reload = () => {
  let GoalsScored = []
  d3.tsv('stats.tsv', function (err, rows) {
    if (err) {
      console.log('TSV parse error' + err)
    } else {
      rows.forEach((row) => {
        GoalsScored.push(row.GoalsScored)
      })
    }
  })
  redraw(GoalsScored)
}

// redraw function
let redraw = (data) => {
  // Your data to graph here

}

reload()


var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};
var svgWidth = 960;
var svgHeight = 700;
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
titlelist=["poverty","healthcare"]
function sumofList(arrayofcolumn)
{
  
  var total=arrayofcolumn.reduce((accu,current)=>accu+current,0)
  return total;
}

function plotSvgOnSelection(titlelistinfo){

  
  var value1=titlelistinfo[0]
  var value2=titlelistinfo[1]
  
  var svgArea = d3.select("body").select("svg");
  if (!svgArea.empty()) {
    svgArea.remove();
  }

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top-10})`);

// Import Data
d3.csv("assets/data/data.csv")
  .then(function(demoData) {
    
       // Step 1: Parse Data/Cast as numbers
    // ==============================
    demoData.forEach(function(data) {
     
      //data.poverty = +data.poverty;
      data[value1] = +data[value1]
      
      data[value2] = +data[value2];
    
    });
    
    var value1list=demoData.map((data)=>data[value1])
    var value2list=demoData.map((data)=>data[value2])

    sumofvalue1=sumofList(value1list)
    sumofvalue2=sumofList(value2list)
    console.log(sumofvalue1)
    var tooltipmap={}
    
    var pervalue1=demoData.map((data)=>{ return ((data[value1]*100)/sumofvalue1).toFixed(2) + "%"} ) 

    var pervalue1=demoData.map((data)=>{return ((data[value1]*100)/sumofvalue1).toFixed(2)+"%"})
    var pervalue2=demoData.map((data)=>(data[value2]*100)/sumofvalue2)
    var stateabbr=demoData.map((data)=>data.abbr)
    
    tooltipmap["state"]=stateabbr
    tooltipmap[value1]=pervalue1
    tooltipmap[value2]=pervalue2
    

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
    .domain(d3.extent(demoData, d => d[value1]))
    //.domain([0, d3.max(demoData, d => d.poverty)])
      .range([0, width])
      ;

    var yLinearScale = d3.scaleLinear()
    .domain(d3.extent(demoData, d => d[value2]))
    //.domain([0, d3.max(demoData, d => d.healthcare)])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale).ticks(7);
    var leftAxis = d3.axisLeft(yLinearScale).ticks(12);

    // Step 4: Append Axes to the chart
    // ==============================
    
    chartGroup.append("g")
    .attr("transform", `translate(-20, ${height+10})`)
      .call(bottomAxis)


      povgroup=chartGroup.append("g")
      .attr("transform", `translate(-20, ${height+10})`)
      .attr("id","povaxis")
      d3.select("#povaxis")
      .append("text")
      .attr("id","poverty")
      .attr("value","poverty")
      //y and x will be calculated from x and y position of g (-20,height+10) as transform start x and y axis at given position
      .attr("y", 20)
      .attr("x", width/2 )
      //.attr("text-anchor", "middle")
         
      .attr("font-size", "12px")
    .attr("font-family", "sans-serif")
     .text("In Poverty(%)")
      if(titlelistinfo.indexOf("poverty")>=0 ){
        povgroup.attr("stroke", "black")
      }
      else {
        
         povgroup.attr("stroke", "grey")
      }
      povgroup.on("click",function(){
        var pov=d3.select("#poverty").attr("value")
      
        titlelist[0]=pov
          plotSvgOnSelection(titlelist)
        
        
      });
      var agegroup=chartGroup.append("g")
      .attr("transform", `translate(-20, ${height+10})`)
      .attr("id","ageaxis")
      d3.select("#ageaxis")
      .append("text")
      .attr("id","age")
      .attr("value","age")
      .attr("y", 40)
      .attr("x", width/2 )
      
      .attr("font-size", "12px")
    .attr("font-family", "sans-serif")
    
      .text("Age (Median)")
      
      if(titlelistinfo.indexOf("age")>=0 ){
        agegroup.attr("stroke", "black")
      }
      else {
         agegroup.attr("stroke", "grey")
      }
      agegroup.on("click",function(){
        var ag=d3.select("#age").attr("value")
        d3.select("#age").attr("stroke","black")
        
          titlelist[0]=ag
         
       
          plotSvgOnSelection(titlelist)
        
      });;
      var incomegroup=chartGroup.append("g")
      .attr("transform", `translate(-20, ${height+10})`)
      .attr("id","incaxis")
      d3.select("#incaxis")
      .append("text")
      .attr("id","income")
      .attr("value","income")
      .attr("y", 57)
      .attr("x", width/2 )
     
      .attr("font-size", "12px")
    .attr("font-family", "sans-serif")
    
      .text("HouseHoldIncome (Median)")
      if(titlelistinfo.indexOf("income")>=0 ){
        incomegroup.attr("stroke", "black")
      }
      else {
        
         incomegroup.attr("stroke", "grey")
      }
      incomegroup.on("click",function(){
        var inc=d3.select("#income").attr("value")
           
          titlelist[0]=inc
       
          plotSvgOnSelection(titlelist)
        
        
      });


    chartGroup.append("g")
    
    .attr("transform", `translate(-20, 10)`)
     .call(leftAxis)

     obegroup=chartGroup.append("g")
     .attr("transform", `translate(-20, 10)`)
     .attr("id","obeaxis")
     d3.select("#obeaxis")
      .append("text")
      .attr("id","obesity")
      .attr("value","obesity")
      .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .attr("x", 0-(height / 2))
    .attr("y",  50-margin.left)
    .attr("font-size", "12px")
    .attr("font-family", "sans-serif")
    
      .text("Obese(%)")
     
      if(titlelistinfo.indexOf("obesity")>=0 ){
        obegroup.attr("stroke", "black")
      }
      else {
        
         obegroup.attr("stroke", "grey")
      }
      obegroup.on("click",function(){
        var obe=d3.select("#obesity").attr("value")
        
       
        titlelist[1]=obe
       plotSvgOnSelection(titlelist)
      
        
      });
      smokegroup=chartGroup.append("g")
      .attr("transform", `translate(-20, 10)`)
      .attr("id","smokeaxis")
      d3.select("#smokeaxis")
      .append("text")
      .attr("id","smokes")
      .attr("value","smokes")
      .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .attr("x", 0-(height / 2))
    .attr("y",  70-margin.left)
    .attr("font-size", "12px")
    .attr("font-family", "sans-serif")
     .text("Smokes(%)")
     if(titlelistinfo.indexOf("smokes")>=0 ){
      smokegroup.attr("stroke", "black")
    }
    else {
      
       smokegroup.attr("stroke", "grey")
    }

      smokegroup.on("click",function(){
        
        var smo=d3.select("#smokes").attr("value")
        d3.select("#smokeaxis").attr("stroke","black")
        titlelist[1]=smo
      
        plotSvgOnSelection(titlelist)
    
      });;
      healthgroup=chartGroup.append("g")
     .attr("transform", `translate(-20, 10)`)
     .attr("id","healthaxis")
     d3.select("#healthaxis")
      .append("text")
      .attr("id","healthcare")
      .attr("value","healthcare")
      .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .attr("x", 0-(height / 2))
    .attr("y",  90-margin.left)
    .attr("font-size", "12px")
    .attr("font-family", "sans-serif")
  
    .text("Lacks Healthcare(%)")
    if(titlelistinfo.indexOf("healthcare")>=0 ){
      healthgroup.attr("stroke", "black")
    }
    else {
      
       healthgroup.attr("stroke", "grey")
    }
    healthgroup.on("click",function(){
      var heal=d3.select("#healthcare").attr("value")
      
        titlelist[1]=heal
           
        plotSvgOnSelection(titlelist)
      
    });
    
    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(demoData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[value1]))
    .attr("cy", d => yLinearScale(d[value2]))
    .attr("r", "8")
    .attr("fill", "blue")
    .attr("opacity", ".5");
    //Add text to each circle. Iterate through data and add each abbr to each circle
    demoData.forEach(function(d) {
    chartGroup
    .append("text")
    // add text where circle is drawn.draw text at x and y pixels of circle. adjusted x and y to fit inside cirlce
    .attr("x",  xLinearScale(d[value1])-6)
    .attr("y",  yLinearScale(d[value2])+3)
   
    //.attr("class","stateText")
    .attr("font-size", "9px")
    .attr("font-family", "sans-serif")
    .attr("fill", "#fff")
    .text(d.abbr)
    });
    var toolTip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .attr("display","block")
    .style("left", "50px")
        .style("top", "100px");
    circlesGroup.on("mouseover", function(d, i) {
      console.log(d3.event.pageX)
      //toolTip.style("display", "block");
      console.log(`<strong>${value1}:${tooltipmap["state"][i]}</strong>`)
      toolTip.html(`<strong>${value1}:${tooltipmap["state"][i]}</strong>`)
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY + "px");
    })
      // Step 3: Add an onmouseout event to make the tooltip invisible
      /*.on("mouseout", function() {
        toolTip.style("display", "none");
      });*/
   
  // Step 2: Add an onmouseover event to display a tooltip
  // ========================================================
  
    
    
  });
}
plotSvgOnSelection(titlelist)
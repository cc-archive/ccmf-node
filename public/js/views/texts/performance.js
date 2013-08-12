jQuery(document).ready(function(e){
	
	 var shinglesPerfData= [0.2],
	 hbar = new RGraph.HBar('csvShinglesPerformance', shinglesPerfData)
	 .Set('chart.units.post','ms')
	 .Set('chart.scale.decimals',2)
     .Set('chart.colors', ['Gradient(#ffd737:#FDB515)'])
     .Set('chart.strokestyle', 'rgba(0,0,0,0)')
     .Set('chart.labels.above', true)
     .Set('chart.labels.above', true)
     .Set('chart.vmargin', 15)
     .Set('chart.background.grid', false)
     .Set('chart.labels', ['9'])
     .Draw();
	 
	 var minHashPerfData= [128.92],
	 hbar = new RGraph.HBar('csvMinhashPerformance',minHashPerfData)
	 .Set('chart.units.post','ms')
	 .Set('chart.scale.decimals',2)
     .Set('chart.colors', ['Gradient(#ffd737:#FDB515)'])
     .Set('chart.strokestyle', 'rgba(0,0,0,0)')
     .Set('chart.labels.above', true)
     .Set('chart.labels.above', true)
     .Set('chart.vmargin', 15)
     .Set('chart.background.grid', false)
     .Set('chart.labels', ['100'])
     .Draw();
	 
	 var lshPerfData= [461.44],
	 hbar = new RGraph.HBar('csvLshPerformance',lshPerfData)
	 .Set('chart.units.post','ms')
	 .Set('chart.scale.decimals',2)
     .Set('chart.colors', ['Gradient(#ffd737:#FDB515)'])
     .Set('chart.strokestyle', 'rgba(0,0,0,0)')
     .Set('chart.labels.above', true)
     .Set('chart.labels.above', true)
     .Set('chart.vmargin', 15)
     .Set('chart.background.grid', false)
     .Set('chart.labels', ['b=20 n=100'])
     .Draw();
});
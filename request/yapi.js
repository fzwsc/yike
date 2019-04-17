const network = require('./network.js');
export default{
	// 专题tab
	specialTab(data){
		 return network.get("/ygb/topic/topic_list",data)
	   
	}
    
	
	
}
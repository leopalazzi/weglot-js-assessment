const fs = require('fs');

Date.prototype.addMinutes = function(m) {
  this.setTime(this.getTime() + (1*m*60*1000));
  return this;
}

const readOutput  = (fileName) => {
	const data = fs.readFileSync(__dirname + '/../data/'+ fileName, 'UTF-8');
	return data;
}

const createMapHours = (fileName) => {
	const data = fs.readFileSync(__dirname + '/../data/'+ fileName, 'UTF-8');
    const lines = data.split(/\r?\n/);
    const mapHour = {};
    lines.forEach( (line) => {
    	const splitedLine = line.split(' ');
	    const day = parseInt(splitedLine[0],10);
	    const hours = splitedLine[1]
	    if(day in mapHour){
	    	const  currentArray = mapHour[day];
	    	const pushed = currentArray.push(hours)
	    	currentArray.sort(); //sort to be ascending array
			mapHour[day] = currentArray;
	    }
	    else{
	    	mapHour[day] = Array(splitedLine[1]);
	    }
    });
    return mapHour;
}

const calculateHours = (fileName)=> {
    try{
    	const mapHour = createMapHours(fileName);
    	const keys = Object.keys(mapHour);
    	let fullString;
    	keys.some( (day) => {
    	const arrayOfDay = mapHour[day];
    	let exitProgram = false;
    	arrayOfDay.some( (hoursUnvailable)=> 
    	{
	    	const hours = hoursUnvailable.split('-');
	    	const startHour = hours[0];
	    	const endHour = hours[1];
	    	let goodHourBefore = true;
	   		let goodHourAfter = true;
	    	const startHourDate = new Date('2018-09-22T' + startHour);
	    	const endHourDate = new Date('2018-09-22T' + endHour);
	    	const oneHourAfter = new Date('2018-09-22T' + endHour).addMinutes(59);
	    	const oneHourBefore = new Date('2018-09-22T' + startHour).addMinutes(-59);

	    	if(oneHourBefore < new Date('2018-09-22T' + '07:58'))
	    	{
	    		goodHourBefore = false;
	    	}
	    	if(oneHourAfter > new Date('2018-09-22T' + '17:58'))
	    	{
	    		goodHourAfter= false;
	    	}

	    	arrayOfDay.some( (hoursUnvailable2)=> 
	    	{
	    		const hours2 = hoursUnvailable2.split('-');
	    		const startHour2 = hours2[0];
	    		const endHour2 = hours2[1];
	    		const startHourDate2 = new Date('2018-09-22T' + startHour2);
	    		const endHourDate2 = new Date('2018-09-22T' + endHour2);
				//check if start hour2 is not between start and end 1
				if(startHourDate2 > oneHourBefore && startHourDate2 < startHourDate)
				{
					goodHourBefore = false;
				}
				else if(endHourDate2 > oneHourBefore && endHourDate2 < startHourDate)
				{
					goodHourBefore= false;
				}
				else if(startHourDate2 < oneHourBefore && endHourDate2 > startHourDate)
				{
					goodHourBefore= false;
				}			
			 	
			 	if(startHourDate2 < oneHourAfter && startHourDate2 > endHourDate)
				{
					goodHourAfter = false;
				}
				else if(endHourDate2 < oneHourAfter && endHourDate2 > endHourDate)
				{
					goodHourAfter= false;
				}
				else if(startHourDate2 < endHourDate && endHourDate2 > oneHourAfter)
				{
					goodHourAfter= false;
				}

				if(!goodHourAfter && !goodHourBefore ){
					return true;
				}


	       	});   	
	       	if(goodHourBefore){
	    		//check il all are available inside time otherwise take the end time
	    		const index = arrayOfDay.findIndex( (element)=> element === hoursUnvailable) 
	    		if(index !==-1 && index!==0){
	    			const endHourBefore = arrayOfDay[index-1].split("-")[1];
	    			const oneMinuteAfter = new Date('2018-09-22T' + endHourBefore).addMinutes(1);
	    			const oneMinuteAfterHours = oneMinuteAfter.getHours()  > 9 ? oneMinuteAfter.getHours() : '0' + oneMinuteAfter.getHours();
	    			const oneMinuteAfterMinutes = oneMinuteAfter.getMinutes()  > 9 ? oneMinuteAfter.getMinutes() : '0' + oneMinuteAfter.getMinutes();
	    			const strOneMinuteAfter = oneMinuteAfterHours+ ':' + oneMinuteAfterMinutes;

	    			const endOfMeetingDate = oneMinuteAfter.addMinutes(59);
	    			const endOfMeetingHours = endOfMeetingDate.getHours() > 9 ? endOfMeetingDate.getHours() : '0' + endOfMeetingDate.getHours();
	    			const endOfMeetingMinutes = endOfMeetingDate.getMinutes() > 9 ? endOfMeetingDate.getMinutes() : '0' + endOfMeetingDate.getMinutes();
	    			const strEndOfMeeting = endOfMeetingHours + ':' + endOfMeetingMinutes;
	    			fullString = `${day} ${strOneMinuteAfter}-${strEndOfMeeting}`;
	    		}
	    		else{
	    			//no value before this hour so we take 8:00-8:59 if it's possible
	    			fullString = `${day} 08:00-08:59`;
	    		}
	    		exitProgram= true;
	    		return true;
	    	}
	    	else if(goodHourAfter){
	    		const oneMinuteAfter = endHourDate.addMinutes(1);
	    		const oneMinuteAfterHours = oneMinuteAfter.getHours()  > 9 ? oneMinuteAfter.getHours() : '0' + oneMinuteAfter.getHours();
				const oneMinuteAfterMinutes = oneMinuteAfter.getMinutes()  > 9 ? oneMinuteAfter.getMinutes() : '0' + oneMinuteAfter.getMinutes();
				const strOneMinuteAfter = oneMinuteAfterHours+ ':' + oneMinuteAfterMinutes;

				const endOfMeetingDate = endHourDate.addMinutes(59);
				const endOfMeetingHours = endOfMeetingDate.getHours() > 9 ? endOfMeetingDate.getHours() : '0' + endOfMeetingDate.getHours();
	    		const endOfMeetingMinutes = endOfMeetingDate.getMinutes() > 9 ? endOfMeetingDate.getMinutes() : '0' + endOfMeetingDate.getMinutes();
	    		const strEndOfMeeting = endOfMeetingHours + ':' + endOfMeetingMinutes;
	    		fullString = `${day} ${strOneMinuteAfter}-${strEndOfMeeting}`;
	    		exitProgram= true;
	    		return true;
	    	}
    	});
    	if(exitProgram){
    		return true;
    	}
    });
    return fullString;
    }
   	catch(error){
   			console.log(error);
   			return "";
   	}
}

exports.calculateHours = calculateHours;
exports.readOutput = readOutput;



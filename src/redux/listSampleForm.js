const today = new Date();
var day = today.getDay();
if (day === 0 ) day = 7;

export const InitialListSample = {
	commingWeek: false,
	taskContainer: [
	{ include: day<=1, customSelect:day<=1, date: new Date(today.getTime()+24*60*60*1000*(1-day)).toLocaleDateString(), abb: "mon"},
	{ include: day<=2, customSelect:day<=2, date: new Date(today.getTime()+24*60*60*1000*(2-day)).toLocaleDateString(), abb: "tue"},
	{ include: day<=3, customSelect:day<=3, date: new Date(today.getTime()+24*60*60*1000*(3-day)).toLocaleDateString(), abb: "wed"},
	{ include: day<=4, customSelect:day<=4, date: new Date(today.getTime()+24*60*60*1000*(4-day)).toLocaleDateString(), abb: "thu"},
	{ include: day<=5, customSelect:day<=5, date: new Date(today.getTime()+24*60*60*1000*(5-day)).toLocaleDateString(), abb: "fri"},
	{ include: day<=6, customSelect:day<=6, date: new Date(today.getTime()+24*60*60*1000*(6-day)).toLocaleDateString(), abb: "sat"},
	{ include: day<=7, customSelect:day<=7, date: new Date(today.getTime()+24*60*60*1000*(7-day)).toLocaleDateString(), abb: "sun"} ],
	taskContainerCommingWeek: [
	{ include: true, customSelect:true, date: new Date(today.getTime()+24*60*60*1000*(1-day+7)).toLocaleDateString(), abb: "mon"},
	{ include: true, customSelect:true, date: new Date(today.getTime()+24*60*60*1000*(2-day+7)).toLocaleDateString(), abb: "tue"},
	{ include: true, customSelect:true, date: new Date(today.getTime()+24*60*60*1000*(3-day+7)).toLocaleDateString(), abb: "wed"},
	{ include: true, customSelect:true, date: new Date(today.getTime()+24*60*60*1000*(4-day+7)).toLocaleDateString(), abb: "thu"},
	{ include: true, customSelect:true, date: new Date(today.getTime()+24*60*60*1000*(5-day+7)).toLocaleDateString(), abb: "fri"},
	{ include: true, customSelect:true, date: new Date(today.getTime()+24*60*60*1000*(6-day+7)).toLocaleDateString(), abb: "sat"},
	{ include: true, customSelect:true, date: new Date(today.getTime()+24*60*60*1000*(7-day+7)).toLocaleDateString(), abb: "sun"} ]
}
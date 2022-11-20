//Finds which appointments should be displayed in the selected day
export function getAppointmentsForDay(state, day) {
  const findDay = state.days.filter(data => data.name === day);
  if(findDay.length === 0){
    return [];
  }
  let returnArr = [];
  for(let item of findDay[0].appointments){
    for(let j = 1; j < item + 1; j++){
      if(item === state.appointments[j].id){
        returnArr.push(state.appointments[j]);
      }
    }
  }
  return returnArr;
}

//Finds the requested interview
export function getInterview(state, interview) {
  if(interview == null){
    return null;
  } else {
    let returnObj = {}
    returnObj['student'] = interview.student;
    let arr = [];
    for(let i = 1; i < Object.keys(state.interviewers).length + 1; i++){
      arr[i] = state.interviewers[i];
    }
    const findInterviewer = arr.filter(data => data.id === interview.interviewer);
    returnObj.interviewer = findInterviewer[0];
    return returnObj;
  }
}

//Finds the correct Interviewers based off of the day
export function getInterviewersForDay(state, day) {
  
  const findDay = state.days.filter(data => data.name === day);
  if(findDay.length === 0){
    return [];
  }
  let returnArr = [];

  for(let item of findDay[0].interviewers){
    for(let j = 1; j < item + 1; j++){
      if(item === state.interviewers[j].id){
        returnArr.push(state.interviewers[j]);
      }
    }
  }
  return returnArr;
}
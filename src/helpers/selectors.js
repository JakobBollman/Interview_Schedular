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
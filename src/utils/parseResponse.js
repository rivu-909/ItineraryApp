export default function parseResponse(res) {
  // /([^.]*\.)\s+/g
  const response = res.split("\n");
  const len = response.length;
  const dayLists = [];
  let dayNum = 0;
  let taskList = [];

  for (let i = 0; i < len; i++) {
    if (response[i].length === 0) continue;
    if (response[i].includes("Day ")) {
      if (taskList.length !== 0) {
        dayLists.push({
          dayNum: ++dayNum,
          listLength: taskList.length,
          taskList,
        });
      }
      taskList = [];
    } else {
      taskList.push(response[i]);
    }
  }

  if (taskList.length !== 0) {
    dayLists.push({
      dayNum: ++dayNum,
      listLength: taskList.length,
      taskList,
    });
  }

  return dayLists;
}

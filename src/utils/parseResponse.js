export default function parseResponse(res) {
  const response = res.split(/\. |\n|:/);
  const len = response.length;
  const dayLists = [];
  let dayNum = 0;
  let taskList = [];
  let taskId = 0;

  for (let i = 0; i < len; i++) {
    if (response[i].length === 0) continue;
    if (response[i].includes("Day ") || response[i].includes("DAY ")) {
      if (taskList.length !== 0) {
        dayLists.push({
          dayNum: ++dayNum,
          listCount: taskList.length,
          taskList,
        });
      }
      taskList = [];
    } else {
      taskList.push({ taskId: ++taskId, text: response[i] });
    }
  }

  if (taskList.length !== 0) {
    dayLists.push({
      dayNum: ++dayNum,
      listCount: taskList.length,
      taskList,
    });
  }

  return dayLists;
}

let i = 0;
let w = 10;

let states = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  values = new Array(floor(width/w));
  for(let i=0;i<values.length;i++){
    values[i] = random(height);
    states[i] = -1;
  }
  frameRate(5);
  quickSort(values,0,values.length-1);
}

async function quickSort(arr,start,end){
  if(start>=end)
    return;
  let index = await partition(arr,start,end);

  /*await Promise.all([
    quickSort(arr,start,index-1),
    quickSort(arr,index+1,end)]
  );*/
  states[index] = -1;
  await quickSort(arr,start,index-1);
  await quickSort(arr,index+1,end);
}

async function partition(arr,start,end){

  for(let i = start;i<end;i++)
    states[i] = 1;
  /*let pivotIndex = start;
  let pivotValue = arr[end];
  states[pivotIndex] = 0;
  for(i = start;i<end;i++){
    if(arr[i] < pivotValue){
      await swap(arr,i,pivotIndex);
      states[pivotIndex] = -1;
      pivotIndex++;
      states[pivotIndex] = 0;
    }
  }
  await swap(arr,pivotIndex,end);*/
  let pivotValue = arr[start];
  let i = start+1;
  let j = end;

  while(i<=j){
    while(i<= end && arr[i] < pivotValue)
      i++;
    while(arr[j] > pivotValue)
      j--;
    if(i<=j){
      await swap(arr,i,j);
      i++;
      j--;
    }
  }
  await swap(arr,start,j);
  for(let i = start;i<end;i++){
    if(i != j)
    states[i] = -1;
  }
  return j;
}

function draw() {
  background(51);
  for(let i=0;i<values.length;i++){
    stroke(0);

    if(states[i] == 0){
      fill('#E0777D');
    }else if(states[i] == 1){
      fill('#D6FFB7');
    }
    else{
      fill(255);
    }
    rect(i*w,height-values[i],w,values[i]);
  }
}

async function swap(arr,a,b){
  await sleep(100)
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve,ms));
}

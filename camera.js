'use strict'
// 1行目に記載している 'use strict' は削除しないでください
const video = document.getElementById("video");
const video2 = document.getElementById("video2");
const canvas = document.getElementById("canvas");
const canvasmemo = document.getElementById("canvas2");
const button1 = document.getElementById("btn1");//camera実行ボタン
const button2 = document.getElementById("btn2");//camera実行ボタン
const button3 = document.getElementById("btn3");//camera実行ボタン
const input = document.getElementById("input");
const buttonRec = document.getElementById("btnRec");//rec実行ボタン
const memo =document.getElementById("memo");
// const cal = document.getElementById("cal");//画像リスト
let model ;

button1.addEventListener("click",cameraHandtrack);//camerahandtrack実行したときの動作
button2.addEventListener("click",cameraLive);//camera実行したときの動作
button3.addEventListener("click",action);//camera実行したときの動作
buttonRec.addEventListener("click",shutterCamera);//rec実行したときの動作
// button2.addEventListener("click",shutterCamera);//rec実行したときの動作

console.log(handTrack)
//判定のオプションを決める（CNN見たいな書き方）
const options ={
    flipHorizontal: true,
    // outputStride: 16,
    // imageScaleFactor: 1,
    maxNumBoxes: 5, //20
    iouThreshold: 0.1,
    scoreThreshold: 0.5,
    // modelType: "ssd320fpnlite",
    // modelSize: "large",
    // bboxLineWidth: "2",
    // fontSize: 17,
};//https://victordibia.com/handtrack.js/#/docs　に書いてある。書かなくてもデフォルトで設定される。


let context = canvas.getContext("2d");

function cameraHandtrack(){
//設定をloadで読み込み、初のthen？を使用する。(promiseがなんとか)
    handTrack.load(options).then(function(modelData){
        model = modelData;
        console.log(model);//中身確認　
        
//option 読み込みあとにカメラ起動
        handTrack.startVideo(video).then(function(status){
            if(status){
                console.log(status);
                startDetection();
            }else{
                console.log("cameraNG");
            }
        });
    })
}
//画像判定をvideoに重ねる
function startDetection(){
    model.detect(video).then((predictions) => {model.renderPredictions(predictions, canvas, context, video);
    requestAnimationFrame(startDetection);
    })
}

function cameraLive(){
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
            .then(stream => {video2.srcObject = stream;
            video2.play();
            })
            .catch(error => console.log(error))
    }


function action(){
    window.alert("🐊🐊🐊🐊🐊🐊🐊🐊🐊🐊")
}
    
function shutterCamera(){
    let count = input.value;
    for (let i = 1; i<=count; i++){
        // let kao = document.createElement("img")
        // const context = canvas.getContext("2d");
        // kao.src = canvas.toDataURL("image/png");
        // cal.appendChild(kao); 
        // const log = canvas.getContext("2d");
        context.drawImage(video2,0,0);
        // console.log(i)
        // let text = document.createElement("p")
        // text.innerText = `書き出せない…`
        // memo.appendChild(text);
        // console.log(memo)
    }
}
    //表示×
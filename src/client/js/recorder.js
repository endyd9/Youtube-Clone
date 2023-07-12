import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const startBtn = document.getElementById("startBtn");
const actionBtn = document.getElementById("actionBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const files = {
  input: "recording.webm",
  outupt: "output.mp4",
  thumb: "thumbnail.jpg",
};

const downloadFile = (fileUrl, fileName) => {
  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
};

const handelDownload = async () => {
  actionBtn.removeEventListener("click", handelDownload);

  actionBtn.innerText = "인코딩중...";

  actionBtn.disabled = true;

  const ffmpeg = createFFmpeg({
    log: true,
  });
  await ffmpeg.load();

  ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile));

  await ffmpeg.run("-i", files.input, "-r", "60", files.outupt);

  await ffmpeg.run(
    "-i",
    files.input,
    "-ss",
    "00:00:01",
    "-frames:v",
    "1",
    files.thumb
  );

  const mp4File = ffmpeg.FS("readFile", files.outupt);
  const thumbFile = ffmpeg.FS("readFile", files.thumb);

  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });

  const mp4Url = URL.createObjectURL(mp4Blob);
  const thumbUrl = URL.createObjectURL(thumbBlob);

  downloadFile(mp4Url, "MyRecording.mp4");
  downloadFile(thumbUrl, "MyThumbNail.jpg");

  ffmpeg.FS("unlink", files.input);
  ffmpeg.FS("unlink", files.outupt);
  ffmpeg.FS("unlink", files.thumb);

  URL.revokeObjectURL(mp4Url);
  URL.revokeObjectURL(thumbUrl);
  URL.revokeObjectURL(videoFile);

  actionBtn.disabled = false;
  actionBtn.innerText = "다시 찍기";
  actionBtn.addEventListener("click", handleStart);
};

const handleStart = () => {
  actionBtn.style.color = "red";
  actionBtn.innerText = "녹화 종료";
  actionBtn.removeEventListener("click", handleStart);
  actionBtn.addEventListener("click", handleStop);
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
  };
  recorder.start();
  setTimeout(() => recorder.stop(), 180000);
};

const handleStop = () => {
  actionBtn.style.color = "";
  actionBtn.innerText = "녹화 다운로드 하기";
  actionBtn.removeEventListener("click", handleStop);
  actionBtn.addEventListener("click", handelDownload);
  recorder.stop();
};

const init = async () => {
  startBtn.style.display = "none";
  document.getElementById("recorder").style.display = "";
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: { width: 1080, height: 720 },
  });

  video.srcObject = stream;
  video.play();
};
startBtn.addEventListener("click", init);
actionBtn.addEventListener("click", handleStart);

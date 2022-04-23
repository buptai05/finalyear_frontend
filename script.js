var firebaseConfig = {
    apiKey: "AIzaSyDdlk8FPbOhzkWt12xWRc-xKQqthQMoq9A",
    authDomain: "fianal-year-proj-pic-upload.firebaseapp.com",
    projectId: "fianal-year-proj-pic-upload",
    storageBucket: "fianal-year-proj-pic-upload.appspot.com",
    messagingSenderId: "981674882305",
    appId: "1:981674882305:web:e2bd3bb3458248fd27d700",
    measurementId: "G-722ZF6PTNK"
  };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    console.log(firebase);

    function uploadImage() {
      const ref = firebase.storage().ref();
      const file = document.querySelector("#photo").files[0];
     // const name = +new Date() + "-" + file.name;
      const name = "cheque"
      const metadata = {
        contentType: file.type
      };
      const task = ref.child(name).put(file, metadata);
      task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
          console.log(url);
          document.querySelector("#image").src = url;
        })
        .catch(console.error);
    }

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snap = document.getElementById("snap");
const errorMsgElement = document.querySelector('span#errorMsg');

const constraints = {
  audio: false,
  video: {
    width: 400, height: 400
  }
};

// Access webcam
async function init() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
  } catch (e) {
    errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
  }
}

// Success
function handleSuccess(stream) {
  window.stream = stream;
  video.srcObject = stream;
}

// Load init
//init();

// Draw image
var context = canvas.getContext('2d');
snap.addEventListener("click", function() {
    context.drawImage(video, 0, 0, 640, 480);
    var image = new Image();
image.id = "pic";
image.src = canvas.toDataURL();
console.log(image.src)
var button = document.createElement('button')
button.textContent = 'Upload Image'
document.body.appendChild(button)

button.onclick = function() {
    const ref = firebase.storage().ref();
    ref.child(new Date() + '-' + 'base64').putString(image.src, 'data_url').then(function(snapshot) {
    console.log('Uploaded a data_url string!');
    alert("Image Uploaded")
});
}
});
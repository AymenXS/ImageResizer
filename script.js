const uploadBox = document.querySelector(".upload-box"),
  previewImg = uploadBox.querySelector("img"),
  fileInput = uploadBox.querySelector("input"),
  widthInput = document.querySelector(".width input"),
  heightInput = document.querySelector(".height input"),
  ratioInput = document.querySelector(".ratio input"),
  qualityInput = document.querySelector(".quality input"),
  downloadBtn = document.querySelector(".download-btn");

let imageRatio;

fileInput.addEventListener("change", loadFile);

const loadFile = (e) => {
  const file = e.target.files[0]; // Getting first user selected file
  if (!file) return; // Return if no file is selected
  previewImg.src = URL.createObjectURL(file); // Passing selected file's URL to previewImg's Src
  previewImg.addEventListener("load", () => {
    // Once the IMG is loaded
    widthInput.value = previewImg.naturalWidth;
    heightInput.value = previewImg.naturalHeight;
    imageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
    document.querySelector(".wrapper").classList.add("active");
  });
};

uploadBox.addEventListener("click", () => fileInput.click());

widthInput.addEventListener("keyup", () => {
  // Getting Height according to the ratio checkbox status
  const height = ratioInput.checked ? widthInput.value / imageRatio : heightInput.value;
  heightInput.value = Math.floor(height);
});

heightInput.addEventListener("keyup", () => {
  // Getting Height according to the ratio checkbox status
  const width = ratioInput.checked ? heightInput.value * imageRatio : widthInput.value;
  widthInput.value = Math.floor(width);
});

downloadBtn.addEventListener("click", resizeAndDownload);

const resizeAndDownload = () => {
  const canvas = document.createElement("canvas");
  const a = document.createElement("a");
  const ctx = canvas.getContext("2d");

  // If quality checkbox is checked, pass 0.7 to imgQuality else pass 1.0
  // 1.0 is 100% quality where 0.7 is 70% of total. You can pass from 0.1 - 1.0
  const imgQuality = qualityInput.checked ? 0.7 : 1.0;

  // Setting canvas Height & Width according to the input values
  canvas.width = widthInput.value;
  canvas.height = heightInput.value;

  // Drawing user selected image onto the canvas
  ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);

  a.href = canvas.toDataURL("image/jpeg", imgQuality);
  a.download = new Date().getTime(); // Passing current time as download value
  a.click(); // Clicking <a> element so the file download
};
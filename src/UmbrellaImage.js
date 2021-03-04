import React, { useEffect, useState } from "react";
import BlueUmbrella from "./images/blue_umbrella.png";
import PinkUmbrella from "./images/pink_umbrella.png";
import YellowUmbrella from "./images/yellow_umbrella.png";
import Logo from "./images/logo512.png";
import { ReactComponent as Loader } from "../src/images/loader_icon.svg";
import "./App.css";
import { ReactComponent as UploadIcon } from "./images/upload_icon.svg";

function UmbrellaImage() {
  const [bgcolor, setBackground] = useState("#d0edf7");
  const [imageValue, setImage] = useState({
    loaderColor: "#2596be",
    bgcolor: "#d0edf7",
  });
  const [loader, setLoader] = useState(false);
  const [uploadedImage, setImageUploader] = useState({
    selectedFile: "",
    selectedFileName: "",
  });
  const [uploadLoader, setuploadLoader] = useState(false);

  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  console.log(uploadedImage);

  const handleChange = (e) => {
    const file = e.target.files[0];

    console.log("UPLOAD function", e.target.files[0].size);
    let fileSize = file?.size / 1024 / 1024;
    if (
      (e.target.files.length && e.target.files[0].type === "image/png") ||
      e.target.files[0].type === "image/jpg"
    ) {
      if (fileSize < 5) {
        setLoader(true);
        setuploadLoader(true);

        setImageUploader({
          selectedFile: URL.createObjectURL(e.target.files[0]),
          selectedFileName: e.target.files[0].name,
        });
      } else {
        alert("  filesize should be less than 5mb");
      }
    } else {
      alert(".png and .jpg files only");
    }
    // setuploadLoader(false);
  };

  function changeLoaderState(loaderColor, bgColor) {
    setImage({ loaderColor: loaderColor, bgcolor: bgColor });

    // event.preventDefault();
    if (uploadedImage.selectedFile !== "") {
      setuploadLoader(true);
      setLoader(true);
      setTimeout(function () {
        setLoader(false);
        setuploadLoader(false);
      }, 2000);
    }
  }

  useEffect(() => {
    // setLoader(true);
    setTimeout(function () {
      setLoader(false);
      setuploadLoader(false);
    }, 2000);
  }, [imageValue, uploadedImage]);

  return (
    <div className="App" style={{ backgroundColor: imageValue.bgcolor }}>
      <div className="container">
        <div className="imageContainer">
          {uploadedImage.selectedFile !== "" && loader === false ? (
            <img
              src={uploadedImage.selectedFile}
              alt="brandImage"
              className="logoImage"
            />
          ) : null}

          {imageValue.loaderColor === "#2596be" && loader === false ? (
            <img className="actualImage" src={BlueUmbrella} alt="blue" />
          ) : imageValue.loaderColor === "#d82d88" && loader === false ? (
            <img className="actualImage" src={PinkUmbrella} alt="pink" />
          ) : imageValue.loaderColor === "#fed144" && loader === false ? (
            <img className="actualImage" src={YellowUmbrella} alt="yellow" />
          ) : null}

          {loader ? (
            <Loader className="loaderImage" fill={imageValue.loaderColor} />
          ) : // <img className="loaderImage" fill alt="loader" src={Loader} />
          null}
        </div>
        <div className="contentContainer">
          <span class="headertitle">Custom Umbrella</span>
          <div className="colorButtons">
            <span
              onClick={() => changeLoaderState("#2596be", "#d0edf7")}
              class="circle blue"
            ></span>
            <span
              onClick={() => changeLoaderState("#d82d88", "#ffd6ec")}
              class="circle pink"
            ></span>
            <span
              onClick={() => changeLoaderState("#fed144", "#f0e1b1")}
              class="circle yellow"
            ></span>
          </div>
          {/* <div className="buttonsDescription"> */}
          <span className="title1">Update a logo for instant preview</span>
          <br />
          <span className="title2">
            .png and .jpg files only. Max file size is 5MB.
          </span>
          {/* </div> */}
          <div
            className="uploadButton"
            style={{ background: imageValue.loaderColor }}
          >
            {uploadLoader === false && uploadedImage.selectedFile == "" ? (
              <UploadIcon
                fill="#ffffff"
                className="uploadImg"
                onClick={handleClick}
              >
                {" "}
              </UploadIcon>
            ) : uploadLoader === true && uploadedImage.selectedFile !== "" ? (
              <Loader fill="#ffffff" className="uploadLoader" />
            ) : (
              <UploadIcon
                fill="#ffffff"
                className="uploadImg"
                onClick={handleClick}
              >
                {" "}
              </UploadIcon>
            )}
            <input
              type="file"
              ref={hiddenFileInput}
              style={{ display: "none" }}
              onChange={handleChange}
            />
            {uploadedImage.selectedFileName === "" ? (
              <label id="uploadText">UPLOAD LOGO</label>
            ) : (
              <>
                <label id="logotext">{uploadedImage.selectedFileName}</label>
                <span class="closeSymbol">X</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UmbrellaImage;

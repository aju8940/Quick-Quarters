import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase/firebase";

// firebase storage

// allow read;
//       allow write : if
//       request.resource.size < 2*1024*1024 &&
//       request.resource.contentType.matches('image/.*')

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.log(error, "ERRRRR");
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) =>
            setFormData({ ...formData, avatar: downloadURL })
          )
          .catch((error) => {
            console.error("Failed to get download URL:", error);
            // Handle permission error here (e.g., display a message to the user)
          });
      }
    );
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-6">Profile</h1>
      <form className="flex flex-col gap-3">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-1"
          src={formData.avatar || currentUser.avatar}
          alt="img"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image Upload (Image must be less than 2mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image Succefully Uploaded</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="username"
          defaultValue={currentUser.username}
          className="border p-3 rounded-lg"
          id="username"
        />
        <input
          type="email"
          defaultValue={currentUser.email}
          className="border p-3 rounded-lg"
          id="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
        />
        <button className="bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;

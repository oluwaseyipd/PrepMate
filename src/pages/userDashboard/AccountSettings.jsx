import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Camera, Save, X, Eye, EyeOff } from "lucide-react";
import user1 from "../../assets/images/user1.jpeg";
import banner from "../../assets/images/banner.jpg";
import { profileSettingsNav } from "../../constants/user";
import { notifications } from "../../constants/user";

const AccountSettings = () => {
  const [activeSection, setActiveSection] = useState("details");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [bannerImage, setBannerImage] = useState(banner);
  const [expandedNotification, setExpandedNotification] = useState(null);
  const [readNotifications, setReadNotifications] = useState([]);


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
      const reader = new FileReader();
      reader.onload = () => {
        setBannerImage(reader.result);
      };
      reader.readAsDataURL(file);
    },
  });
  
  const toggleNotification = (id) => {
    setExpandedNotification(expandedNotification === id ? null : id);
    if (!readNotifications.includes(id)) {
      setReadNotifications([...readNotifications, id]);
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen p-2 md:p-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="relative">
          <div
            className="h-32 bg-cover bg-center rounded-t-lg"
            style={{ backgroundImage: `url(${banner})` }}
          ></div>
          <img
            src={user1}
            alt="User Profile"
            className="w-20 md:w-30 h-20 md:h-30 rounded-full border-4 border-white absolute bottom-0 left-4 transform translate-y-1/2"
          />
          <div
            {...getRootProps()}
            className="bg-transparent border text-gray-200 border-gray-400  px-5 py-1  text-sm md:text-lg rounded-full absolute top-6 right-3 cursor-pointer"
          >
            <input {...getInputProps()} />
            Change Cover
          </div>{" "}
        </div>
        <div className="mt-15 md:mt-6 md:pl-40">
          <h2 className="text-2xl text-black font-semibold">Mohid Khan</h2>
          <p className="text-gray-500 text-sm">
            UX Designer | San Francisco | Joined August 2024
          </p>
        </div>

        <div className="mt-6 pb-3 flex space-x-6 text-gray-600">
          {profileSettingsNav.map((item) => (
            <button
              key={item.path}
              className={`text-black hover:text-blue-600 font-semibold border-b-2 pb-2 cursor-pointer ${
                activeSection === item.path
                  ? " text-blue-600 border-blue-600"
                  : "border-transparent"
              }`}
              onClick={() => setActiveSection(item.path)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mt-6">
        {activeSection === "details" && (
          <>
          <div className="border-b border-gray-400 pb-4 mb-4">
             <h3 className="text-lg text-black font-semibold">My Details</h3>
            <p className="text-gray-800">
              Please fill full details about yourself
            </p>
          </div>
           

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-gray-600">First Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 text-black p-2 rounded mt-1"
                  placeholder="Enter First Name"
                />
              </div>
              <div>
                <label className="text-gray-600">Last Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 text-black p-2 rounded mt-1"
                  placeholder="Enter Last Name"
                />
              </div>
              <div>
                <label className="text-gray-600">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 text-black p-2 rounded mt-1"
                  placeholder="Enter Email"
                />
              </div>
              <div>
                <label className="text-gray-600">Phone Number</label>
                <input
                  type="tel"
                  className="w-full border border-gray-300 text-black p-2 rounded mt-1"
                  placeholder="Enter Phone Number"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-gray-600">Role</label>
            <input
              type="text"
              className="w-full border border-gray-300 text-black p-2 rounded mt-1"
              placeholder="Enter Role"
            />
          </div>
          <div>
            <label className="text-gray-600">Country</label>
            <input
              type="text"
              className="w-full border border-gray-300 text-black p-2 rounded mt-1"
              placeholder="Enter Country"
            />
          </div>
          

          </div>

            {/* Upload image */}
            <div className="mt-4">
              <label className="text-gray-600">Your Photo</label>
              <div
                {...getRootProps()}
                className={`border p-4 rounded flex flex-col items-center justify-center relative border-gray-300 cursor-pointer ${
                  isDragActive ? "border-blue-500 border-3 " : ""
                }`}
              >
                <input {...getInputProps()} />
                <Camera className="text-blue-500 mb-2 w-10 h-10" />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <>
                    <p className="text-black">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-blue-500 text-sm md:text-lg text-center">
                      SVG, PNG, JPEG OR GIF (max 1080px x 1200px)
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="text-gray-600">Bio</label>
              <textarea
                className="w-full border border-gray-300 text-black p-2 rounded mt-1"
                placeholder="Write something about yourself..."
              ></textarea>
            </div>

            <div className="flex space-x-4 mt-6">
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded flex items-center cursor-pointer">
                <X size={16} className="mr-2" /> Cancel
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center cursor-pointer">
                <Save size={16} className="mr-2" /> Save Changes
              </button>
            </div>
          </>
        )}

        {/* Password Setting */}

        {activeSection === "password" && (
          <>
            <div className="border-b border-gray-400 pb-4 mb-4">
              <h3 className="text-xl text-black font-semibold">
                Password Settings
              </h3>
              <p className="text-black">Change your password</p>
            </div>

            <div className=" mt-4">
              <div className="flex flex-col relative">
                <label className="text-black">Current Password</label>
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  className="w-full md:w-2/3 lg:w-1/3 border border-gray-300 text-black p-2 pr-10 rounded mt-1"
                  placeholder="Enter Current Password"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              <div className="flex flex-col mt-4 relative">
                <label className="text-black">New Password</label>
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="w-full md:w-2/3 lg:w-1/3  border border-gray-300 text-black p-2 rounded mt-1"
                  placeholder="Enter New Password"
                />
                <button
                  type="button"
                  className="absolute right-2 top-8 transform -translate-y-1/2"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="flex flex-col mt-4 relative">
                <label className="text-black">Confirm New Password</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full md:w-2/3 lg:w-1/3  border border-gray-300 text-black p-2 rounded mt-1"
                  placeholder="Confirm New Password"
                />
                <button
                  type="button"
                  className="absolute right-2 top-8 transform -translate-y-1/2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            <div className="mt-10">
              <p className="mb-1 text-black font-semibold">
                Password Requirements:
              </p>
              <ul className="pl-5 md:pl-10 text-gray-700 list-disc">
                <li className="mb-1">At least one lowercase character</li>
                <li className="mb-1">
                  Minimum 8 characters long - the more, the better
                </li>
                <li className="mb-1">
                  At least one number, symbol, or whitespace character
                </li>
              </ul>
            </div>

            <div className="mt-4 text-black">
              <p className="mb-1 text-black font-semibold">
                Two-Step Verification
              </p>

              <p className="mb-1">
                Two-factor authentication is not enabled yet.
              </p>
              <p className="mb-1">
                Two-factor authentication adds a layer of security to your
                account by requiring more than just a password to log in.
              </p>
              {/* <Link>Learn More</Link> */}
            </div>

            <div className="flex space-x-4 mt-6">
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded flex items-center cursor-pointer">
                <X size={16} className="mr-2" /> Cancel
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center cursor-pointer">
                <Save size={16} className="mr-2" /> Save Changes
              </button>
            </div>
          </>
        )}


                {/* Notification */}

                {activeSection === 'notification' && (
          <>
             <div className="border-b border-gray-400 pb-4 mb-4">
             <h3 className="text-lg text-black font-semibold">Notification</h3>
            <p className="text-gray-800">
              Check new updates
            </p>
          </div>
            <div className="mt-4 space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="bg-white shadow rounded-lg p-4 flex items-start space-x-4">
                  <img src={notification.image} alt="Notification" className="w-12 h-12 rounded-full" />
                  <div className="flex-1">
                    <h4 className={`text-lg font-semibold ${readNotifications.includes(notification.id) ? 'text-gray-500' : 'text-black'}`}>
                      {notification.title}
                    </h4>
                    <p className={`text-gray-500 ${readNotifications.includes(notification.id) ? 'text-gray-500' : 'text-black'}`}>
                      {expandedNotification === notification.id ? notification.content : `${notification.content.substring(0, 100)}...`}
                    </p>
                    <button
                      className="text-blue-600 cursor-pointer hover:underline mt-2"
                      onClick={() => toggleNotification(notification.id)}
                    >
                      {expandedNotification === notification.id ? 'Close' : 'Open'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </div>



);
};

export default AccountSettings;

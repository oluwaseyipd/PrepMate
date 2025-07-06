import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { 
  Camera, 
  Save, 
  X, 
  Eye, 
  EyeOff, 
  PlusCircle,
  Users,
  ShieldCheck,
  Settings as Cog,
  Edit3,
  Bell,
  Lock,
  User
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import user1 from "../../assets/images/user1.jpeg";
import banner from "../../assets/images/banner.jpg";
import { profileSettingsNav } from "../../constants/user";
import { notifications } from "../../constants/user";

// Role access helper function
const getRole = () =>
  (JSON.parse(localStorage.getItem("user")) || {}).role ||
  localStorage.getItem("role") ||
  "user";

const AccountSettings = () => {
  const [activeSection, setActiveSection] = useState("details");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [bannerImage, setBannerImage] = useState(banner);
  const [profileImage, setProfileImage] = useState(user1);
  const [expandedNotification, setExpandedNotification] = useState(null);
  const [readNotifications, setReadNotifications] = useState([]);
  
  const navigate = useNavigate();
  const role = getRole(); // "user" | "admin" | "superadmin"

  // Helper to check role permissions
  const can = (roles) => roles.includes(role);

  // Changing Profile Banner
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setBannerImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    },
  });

  // Changing Profile Picture
  const fileInputRef = React.useRef();

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleNotification = (id) => {
    setExpandedNotification(expandedNotification === id ? null : id);
    if (!readNotifications.includes(id)) {
      setReadNotifications([...readNotifications, id]);
    }
  };

  const getTabIcon = (path) => {
    switch (path) {
      case "details": return <User size={18} />;
      case "password": return <Lock size={18} />;
      case "notification": return <Bell size={18} />;
      default: return null;
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50/30 min-h-screen p-2 md:p-6">
      {/* Enhanced Header Section */}
      <div className="relative overflow-hidden rounded-2xl shadow-xl bg-white backdrop-blur-sm">
        {/* Profile Banner with Gradient Overlay */}
        <div className="relative">
          <div
            className="h-40 md:h-48 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${bannerImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          
          {/* Enhanced Change Cover Button */}
          <div
            {...getRootProps()}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm border border-white/20 hover:bg-white transition-all duration-300 px-4 py-2 text-sm font-medium rounded-full cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <input {...getInputProps()} />
            <div className="flex items-center gap-2 text-gray-700">
              <Edit3 size={16} />
              Change Cover
            </div>
          </div>
        </div>

        {/* Enhanced Profile Picture Section */}
        <div className="relative px-6 pb-6">
          <div className="flex flex-col md:flex-row md:items-end md:gap-6">
            {/* Profile Picture with Enhanced Styling */}
            <div className="relative -mt-16 md:-mt-20">
              <div className="relative">
                <img
                  src={profileImage}
                  alt="User Profile"
                  className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white shadow-xl object-cover"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                  ref={fileInputRef}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110"
                >
                  <PlusCircle size={20} />
                </button>
              </div>
            </div>

            {/* Profile Info with Enhanced Typography */}
            <div className="mt-4 md:mt-0 flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                Abiola John
              </h2>
              <p className="text-gray-600 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                Frontend Developer • Nigeria • Joined February 2025
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation Tabs */}
      <div className="bg-white rounded-2xl shadow-lg mt-6 overflow-hidden">
        <div className="border-b border-gray-100">
          <div className="flex flex-wrap gap-1 p-2">
            {profileSettingsNav.map((item) => (
              <button
                key={item.path}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeSection === item.path
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                }`}
                onClick={() => setActiveSection(item.path)}
              >
                {getTabIcon(item.path)}
                {item.name}
              </button>
            ))}
            
            {/* Enhanced Admin Controls tab */}
            {can(["admin", "superadmin"]) && (
              <button
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeSection === "admin-controls"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                }`}
                onClick={() => setActiveSection("admin-controls")}
              >
                <Users size={18} />
                Admin Controls
              </button>
            )}
            
            {/* Enhanced Platform Settings tab */}
            {can(["superadmin"]) && (
              <button
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeSection === "super-controls"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                }`}
                onClick={() => setActiveSection("super-controls")}
              >
                <ShieldCheck size={18} />
                Platform Settings
              </button>
            )}
          </div>
        </div>

        {/* Enhanced Content Area */}
        <div className="p-6">
          {/* Details Section */}
          {activeSection === "details" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">My Details</h3>
                  <p className="text-gray-600">Please fill full details about yourself</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-200 text-gray-900 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter First Name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-200 text-gray-900 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter Last Name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    className="w-full border border-gray-200 text-gray-900 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter Email"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full border border-gray-200 text-gray-900 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter Phone Number"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Role</label>
                  <input
                    type="text"
                    className="w-full border border-gray-200 text-gray-900 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter Role"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Country</label>
                  <input
                    type="text"
                    className="w-full border border-gray-200 text-gray-900 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter Country"
                  />
                </div>
              </div>

              {/* Enhanced Photo Upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Your Photo</label>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed p-8 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                    isDragActive 
                      ? "border-blue-500 bg-blue-50" 
                      : "border-gray-300 hover:border-blue-400 hover:bg-blue-50/50"
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className="p-3 bg-blue-100 rounded-full mb-4">
                    <Camera className="text-blue-600" size={32} />
                  </div>
                  {isDragActive ? (
                    <p className="text-blue-600 font-medium">Drop the files here...</p>
                  ) : (
                    <div className="text-center">
                      <p className="text-gray-900 font-medium mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-blue-600 text-sm">
                        SVG, PNG, JPEG OR GIF (max 1080px x 1200px)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  className="w-full border border-gray-200 text-gray-900 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 h-32 resize-none"
                  placeholder="Write something about yourself..."
                ></textarea>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl flex items-center gap-2 font-medium transition-all duration-300 transform hover:scale-105">
                  <X size={18} />
                  Cancel
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Enhanced Password Settings Section */}
          {activeSection === "password" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Lock className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Password Settings</h3>
                  <p className="text-gray-600">Change your password</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Enhanced Password Inputs */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      className="w-full md:w-2/3 lg:w-1/2 border border-gray-200 text-gray-900 p-3 pr-12 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter Current Password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      className="w-full md:w-2/3 lg:w-1/2 border border-gray-200 text-gray-900 p-3 pr-12 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter New Password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="w-full md:w-2/3 lg:w-1/2 border border-gray-200 text-gray-900 p-3 pr-12 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Confirm New Password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Enhanced Password Requirements */}
              <div className="bg-blue-50 p-6 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-3">Password Requirements:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    At least one lowercase character
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    Minimum 8 characters long - the more, the better
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    At least one number, symbol, or whitespace character
                  </li>
                </ul>
              </div>

              {/* Enhanced 2FA Section */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-3">Two-Step Verification</h4>
                <div className="space-y-2 text-gray-700">
                  <p>Two-factor authentication is not enabled yet.</p>
                  <p>Two-factor authentication adds a layer of security to your account by requiring more than just a password to log in.</p>
                </div>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl flex items-center gap-2 font-medium transition-all duration-300 transform hover:scale-105">
                  <X size={18} />
                  Cancel
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Enhanced Notifications Section */}
          {activeSection === "notification" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Bell className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Notifications</h3>
                  <p className="text-gray-600">Check new updates</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="bg-white border border-gray-200 rounded-xl p-6 flex items-start gap-4 hover:shadow-md transition-all duration-300"
                  >
                    <img
                      src={notification.image}
                      alt="Notification"
                      className="w-14 h-14 rounded-full object-cover shadow-sm"
                    />
                    <div className="flex-1">
                      <h4
                        className={`text-lg font-semibold mb-2 ${
                          readNotifications.includes(notification.id)
                            ? "text-gray-500"
                            : "text-gray-900"
                        }`}
                      >
                        {notification.title}
                      </h4>
                      <p
                        className={`leading-relaxed ${
                          readNotifications.includes(notification.id)
                            ? "text-gray-400"
                            : "text-gray-600"
                        }`}
                      >
                        {expandedNotification === notification.id
                          ? notification.content
                          : `${notification.content.substring(0, 100)}...`}
                      </p>
                      <button
                        className="text-blue-600 hover:text-blue-700 font-medium mt-3 transition-colors duration-200"
                        onClick={() => toggleNotification(notification.id)}
                      >
                        {expandedNotification === notification.id ? "Show Less" : "Read More"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced Admin Controls Section */}
          {activeSection === "admin-controls" && can(["admin", "superadmin"]) && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Admin Controls</h3>
                  <p className="text-gray-600">Manage content and users</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <button
                  onClick={() => navigate("/dashboard/admin/managecourses")}
                  className="bg-blue-50 hover:bg-blue-100 p-6 rounded-xl flex items-center gap-4 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <div className="p-3 bg-blue-600 rounded-lg">
                    <Users size={24} className="text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900">Manage Courses</h4>
                    <p className="text-sm text-gray-600">Create and edit courses</p>
                  </div>
                </button>
                
                <button
                  onClick={() => navigate("/dashboard/admin/managetests")}
                  className="bg-blue-50 hover:bg-blue-100 p-6 rounded-xl flex items-center gap-4 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <div className="p-3 bg-blue-600 rounded-lg">
                    <Users size={24} className="text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900">Manage Tests</h4>
                    <p className="text-sm text-gray-600">Create and manage tests</p>
                  </div>
                </button>
                
                <button
                  onClick={() => navigate("/dashboard/admin/manageresources")}
                  className="bg-blue-50 hover:bg-blue-100 p-6 rounded-xl flex items-center gap-4 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <div className="p-3 bg-blue-600 rounded-lg">
                    <Users size={24} className="text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900">Manage Resources</h4>
                    <p className="text-sm text-gray-600">Upload and organize resources</p>
                  </div>
                </button>
                
                <button
                  onClick={() => navigate("/dashboard/admin/manageusers")}
                  className="bg-blue-50 hover:bg-blue-100 p-6 rounded-xl flex items-center gap-4 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <div className="p-3 bg-blue-600 rounded-lg">
                    <Users size={24} className="text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900">Manage Users</h4>
                    <p className="text-sm text-gray-600">User accounts and permissions</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Enhanced Super Admin Controls Section */}
          {activeSection === "super-controls" && can(["superadmin"]) && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ShieldCheck className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Platform Settings</h3>
                  <p className="text-gray-600">High-level configuration</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <button
                  onClick={() => navigate("/dashboard/superadmin/settings/system")}
                  className="bg-blue-50 hover:bg-blue-100 p-6 rounded-xl flex items-center gap-4 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <div className="p-3 bg-blue-600 rounded-lg">
                    <Cog size={24} className="text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900">System Configuration</h4>
                    <p className="text-sm text-gray-600">Platform settings and config</p>
                  </div>
                </button>
                
                <button
                  onClick={() => navigate("/dashboard/superadmin/audit-logs")}
                  className="bg-blue-50 hover:bg-blue-100 p-6 rounded-xl flex items-center gap-4 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <div className="p-3 bg-blue-600 rounded-lg">
                    <ShieldCheck size={24} className="text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900">Audit Logs</h4>
                    <p className="text-sm text-gray-600">System activity and logs</p>
                  </div>
                </button>
                
                <button
                  onClick={() => navigate("/dashboard/superadmin/admins")}
                  className="bg-blue-50 hover:bg-blue-100 p-6 rounded-xl flex items-center gap-4 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <div className="p-3 bg-blue-600 rounded-lg">
                    <Users size={24} className="text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900">Admin Management</h4>
                    <p className="text-sm text-gray-600">Manage administrator accounts</p>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
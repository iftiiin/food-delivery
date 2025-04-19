import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FiCamera, FiMail, FiUser, FiMapPin, FiPhone } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { getUserProfile } from '../lib/auth';
const Profile = () => {
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();


    useEffect(() => {

        if (user) {
            fetchUserProfile()
        }

    }, [user])

    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            const { profile, customer } = await getUserProfile(user.id);
            console.log(customer)
            if (profile) {
                setUsername(profile.username);
                setPhone(customer.phone || "");
                setAddress(customer.address || "")
                setAvatarUrl(profile.avator_url)
            }
            return
        } catch (error) {
            console.log("error getting usr profile", error)
        } finally {
            setLoading(false)
        }
    }
    const handleAvatarChange = (e) => {

        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            if (file.size > 5 * 1024 * 1024) {
                toast.error("file size is too large")
                return
            }

            setAvatar(file)

            const previewURL = URL.createObjectURL(file)
            setAvatarUrl(previewURL)

        }


    }
    const handleSubmit = (e) => {

        e.preventDefault();

    }
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="px-6 py-8">
                        <div className="flex items-center space-x-4">
                            <div className="relative group">
                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                    <img
                                        src={avatarUrl || 'https://plus.unsplash.com/premium_photo-1669075651831-b7ed6763a9c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dXNlciUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D'}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* input image upload */}

                                <label
                                    htmlFor="avatar-upload"
                                    className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer
                                    transform transition-transform duration-200 hover:scale-110">
                                    <FiCamera className="w-5 h-5 text-black" />
                                </label>
                                <input
                                    type="file"
                                    id="avatar-upload"
                                    className=" hidden"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                />
                            </div>

                            {/* user info  */}

                            <div>
                                <h2 className="mt-4 text-2xl font-bold text-black">
                                {username || 'Your Profile'}
                                </h2>
                                <p >{user?.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Profile form*/}

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div className="space-y-6">
                            {/* Username */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Username
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiUser className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md 
                                        focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                                        required
                                    />
                                </div>
                            </div>


                            {/* Email*/}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiMail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                                        value={user?.email || ''}
                                        disabled
                                    />
                                </div>
                            </div>
                            
                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Phone
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiPhone className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md 
                                        focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Address
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiMapPin  className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md 
                                        focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                                        required
                                    />
                                </div>
                            </div>

                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between pt-6 border-t border-gray-200">

                            <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium 
                                 rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 
                                focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 cursor-pointer">
                                Save Changes
                            </button>

                        </div>
                    </form>

                </div>

            </div>
        </div>
    )
}



export default Profile
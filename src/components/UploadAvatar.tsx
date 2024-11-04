

interface UploadAvatarProps {
    avatarURL: string;
    setAvatar: (file: File | null) => void;
}

export default function UploadAvatar({ avatarURL, setAvatar }: UploadAvatarProps) {

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setAvatar(file);
    };

    return (
        <div>
            <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                Avatar
            </label>
            <input
                type="file"
                id="avatar"
                onChange={handleFileChange}
                className="mt-1 block w-full"
            />
            {avatarURL && (
                <div className="mt-2">
                    <img src={avatarURL} alt="Avatar" className="w-20 h-20 rounded-full" />
                </div>
            )}
        </div>
    )
}
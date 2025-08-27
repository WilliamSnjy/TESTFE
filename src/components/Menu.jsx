import HomeIcon from '@mui/icons-material/Home';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

export default function Menu(){
    return (
        <div className='flex flex-col bg-[#FFFFFF] p-4 gap-4 w-fit shadow-[2px_0_1px_rgba(128,128,128,0.1)] h-full'>
            <div className='p-2'>
                <HomeIcon />
            </div>
            <div className='p-2 bg-[#4A8394] rounded-sm'>
                <InsertDriveFileIcon className='text-white'/>
            </div>
        </div>
    )
}
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function TopNavBar(){
    return (
        <div className="grid grid-cols-2 py-2 px-4 bg-gradient-to-r from-[#18A2BA] to-[#296377] text-white font-bold">
            <div className="flex flex-row items-center gap-4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Logo_PLN.png/960px-Logo_PLN.png" alt="logo" width={50} />
                <h1>iMeeting</h1>
            </div>
            <div className="flex flex-row-reverse items-center font-thin gap-4">
                <KeyboardArrowDownIcon />
                <h1 >John Doe</h1>
                <img src="https://cdn-icons-png.flaticon.com/512/219/219983.png" alt="user" width={40} height={40} />
                <NotificationsIcon />
            </div>
        </div>
    )
}
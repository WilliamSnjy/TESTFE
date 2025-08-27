import { Link } from "react-router-dom"
import TopNavBar from "../components/TopNavBar"
import Menu from "../components/Menu"

export default function Meeting(){
    return (
        <div className="bg-[#FEFEFE]">
            <TopNavBar />
            <div className="h-screen flex">
                <Menu />
                <div className="p-8 grid grid-cols-2 w-full">
                    <div>
                        <h1 className="text-4xl font-bold">Ruang Meeting</h1>
                        <p className="text-[#4A8394]">Ruang Meeting</p>
                    </div>
                    <div className="flex flex-row-reverse h-fit text-white">
                        <Link to='/pesanruang'>
                            <button className="px-4 py-2 bg-[#4A8394] rounded-md hover:bg-[#4A8394]/80">+ Pesan Ruangan</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
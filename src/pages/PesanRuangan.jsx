import TopNavBar from "../components/TopNavBar"
import Menu from "../components/Menu"
import Form from "../components/Form"

export default function PesanRuangan(){
    return (
        <div className="bg-[#FEFEFE]">
            <TopNavBar />
            <div className="h-screen flex">
                <Menu />
                <div className="p-8 w-full">
                    <div>
                        <h1 className="text-4xl font-bold">Ruang Meeting</h1>
                        <div className="flex gap-2">
                            <p className="text-gray-400">Ruang Meeting</p>
                            <p className="text-[#4A8394]">{">"} Pesan Ruangan</p>
                        </div>
                    </div>
                    <div>
                        <Form />
                    </div>
                </div>
            </div>
        </div>
    )
}
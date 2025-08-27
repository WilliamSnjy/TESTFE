import { Link } from "react-router-dom"
import { useEffect, useState } from "react";

export default function Form(){
    const [units,setUnit] = useState([]);
    const [meets,setMeet] = useState([]);
    const [consumes, setConsume] = useState([]);
    const [selectedUnit, setSelectedUnit] = useState("");
    const [selectedMeeting, setSelectedMeeting] = useState("");

    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [date, setDate] = useState("");
    const [participants, setParticipants] = useState(0);
    const [selectedConsumes, setSelectedConsumes] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const [errors, setErrors] = useState({});

    const fetchUnit = () => {
        fetch('https://6666c7aea2f8516ff7a4e261.mockapi.io/api/dummy-data/masterOffice')
        .then((res) => res.json())
        .then((data) => setUnit(data))
    }

    const fetchMeeting = () => {
        fetch('https://6666c7aea2f8516ff7a4e261.mockapi.io/api/dummy-data/masterMeetingRooms')
        .then((res) => res.json())
        .then((data) => setMeet(data))
    }

    const fetchConsume = () => {
        fetch('https://6686cb5583c983911b03a7f3.mockapi.io/api/dummy-data/masterJenisKonsumsi')
        .then((res) => res.json())
        .then((data) => setConsume(data))
    }

    useEffect(() => {
        fetchUnit();
        fetchMeeting();
        fetchConsume();
    },[])

    const filteredMeetings = meets.filter(
        (meet) => meet.officeId === selectedUnit
    )

    const selectedRoom = meets.find((meet) => meet.id === selectedMeeting)

    useEffect(() => {
        if (!startTime || !endTime || participants <= 0) {
            setSelectedConsumes([]);
            setTotalPrice(0);
            return;
        }

        const startHour = parseInt(startTime.split(":")[0]);
        const endHour = parseInt(endTime.split(":")[0]);

        let konsumsiTypes = [];

        if (startHour < 11) konsumsiTypes.push("Snack Siang");
        if (startHour < 14 && endHour >= 11) konsumsiTypes.push("Makan Siang");
        if (endHour >= 14) konsumsiTypes.push("Snack Sore");

        konsumsiTypes = [...new Set(konsumsiTypes)];
        setSelectedConsumes(konsumsiTypes);

        let harga = 0;
        konsumsiTypes.forEach(k => {
            const item = consumes.find(c => c.name === k); 
            if (item) {
                harga += participants * item.maxPrice;
            }
        });

        setTotalPrice(harga);
    }, [startTime, endTime, participants, consumes]);

    useEffect(() => {
        let newErrors = {};

        if (!date) {
            newErrors.date = "Tanggal harus diisi.";
        } else if (startTime) {
            const now = new Date();
            const selectedStart = new Date(`${date}T${startTime}`);
            if (selectedStart < now) {
                newErrors.startTime = "Waktu mulai tidak boleh lebih kecil dari sekarang.";
            }
        }

        if (!startTime) {
            newErrors.startTime = "Waktu mulai harus diisi.";
        }

        if (!endTime) {
            newErrors.endTime = "Waktu selesai harus diisi.";
        } else if (startTime && endTime) {
            const start = new Date(`${date}T${startTime}`);
            const end = new Date(`${date}T${endTime}`);
            if (end <= start) {
                newErrors.endTime = "Waktu selesai harus lebih besar dari waktu mulai.";
            }
        }

        if (participants <= 0) {
            newErrors.participants = "Jumlah peserta harus lebih dari 0.";
        } else if (selectedRoom && participants > selectedRoom.capacity) {
            newErrors.participants = "Jumlah peserta tidak boleh lebih besar dari kapasitas ruangan.";
        }

        setErrors(newErrors);
    }, [date, startTime, endTime, participants, selectedRoom]);

    const isFormValid =
        Object.keys(errors).length === 0 &&
        date &&
        startTime &&
        endTime &&
        participants > 0 &&
        selectedUnit &&
        selectedMeeting;

    return(
        <div className="shadow-xl/20 flex flex-col mt-5 p-4">
            <h1>Informasi Ruang Meeting</h1>
            <div className="flex flex-row gap-2">
                <div className="flex flex-col">
                    <label>Unit</label>
                    <select className="p-2 border rounded-sm w-64" 
                        value={selectedUnit}
                        onChange={(e) => {
                            setSelectedUnit(e.target.value); 
                            setSelectedMeeting("")
                        }}>
                        <option value="">-- pilih unit --</option>
                        {units.map(unit => (
                            <option key={unit.id} value={unit.id}>{unit.officeName}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label>Ruang Meeting</label>
                    <select className="p-2 border rounded-sm w-64"
                        value={selectedMeeting}
                        onChange={(e) => setSelectedMeeting(e.target.value)}
                        disabled={!selectedUnit}
                    >
                        <option value="">-- pilih ruangan --</option>
                        {filteredMeetings.map(meet => (
                            <option key={meet.id} value={meet.id}>{meet.roomName}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="flex flex-col">
                <label>Kapasitas</label>
                <input type="text" className="border rounded-sm p-2 w-64" 
                    value={selectedRoom ? selectedRoom.capacity : ""} readOnly/>
            </div>
            <div className="border border-gray-200 mt-2"></div>
            <h1>Informasi Rapat</h1>
            <div className="flex flex-row gap-2">
                <div className="flex flex-col">
                    <label>Tanggal</label>
                    <input type="date" className="border rounded-sm p-2 w-64"
                        value={date} onChange={(e)=>setDate(e.target.value)}/>
                    {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
                </div>
                <div className="flex flex-col">
                    <label>Waktu Mulai</label>
                    <input type="time" className="border rounded-sm p-2 w-64"
                        value={startTime} onChange={(e)=>setStartTime(e.target.value)}/>
                    {errors.startTime && <p className="text-red-500 text-sm">{errors.startTime}</p>}
                </div>
                <div className="flex flex-col">
                    <label>Waktu Selesai</label>
                    <input type="time" className="border rounded-sm p-2 w-64"
                        value={endTime} onChange={(e)=>setEndTime(e.target.value)}/>
                    {errors.endTime && <p className="text-red-500 text-sm">{errors.endTime}</p>}
                </div>
            </div>
            <div className="flex flex-col">
                <label>Jumlah Peserta</label>
                <input type="number" className="border rounded-sm p-2 w-64"
                    value={participants} onChange={(e)=>setParticipants(parseInt(e.target.value)||0)}/>
                {errors.participants && <p className="text-red-500 text-sm">{errors.participants}</p>}
            </div>
            <div className="flex flex-col">
                <label>Jenis Konsumsi</label>
                {selectedConsumes.length === 0 ? (
                    <p className="text-gray-400">- belum ada -</p>
                ) : (
                    selectedConsumes.map((k,i) => (
                        <div key={i} className="flex items-center">
                            <input type="checkbox" checked readOnly/>
                            <label className="ml-2">{k}</label>
                        </div>
                    ))
                )}
            </div>
            <div className="flex flex-col">
                <label>Nominal Konsumsi</label>
                <div className="flex">
                    <span className="inline-flex items-center border rounded-tl-sm rounded-bl-sm p-2">Rp</span>
                    <input type="text" className="border p-2 w-64 rounded-tr-sm rounded-br-sm"
                        value={totalPrice} readOnly/>
                </div>
            </div>
            <div className="border border-gray-200 mt-2"></div>
            <div className="flex flex-row-reverse gap-2 mt-2">
                <button
                    className={`p-2 rounded-sm ${
                        isFormValid
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={!isFormValid}
                >
                    Simpan
                </button>
                <Link to='/' className="flex items-center"><button className="text-red-400">Batal</button></Link>
            </div>
        </div>
    )
}

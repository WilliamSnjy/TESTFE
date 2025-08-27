import SettingsIcon from '@mui/icons-material/Settings';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { PieChart } from '@mui/x-charts/PieChart';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [summary, setSummary] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("");

  const fetchUnit = () => {
    fetch('https://6686cb5583c983911b03a7f3.mockapi.io/api/dummy-data/summaryBookings')
      .then((res) => res.json())
      .then((data) => {
        setSummary(data);
        if (data.length > 0) {
          setSelectedPeriod(data[0].period);
        }
      });
  };

  useEffect(() => {
    fetchUnit();
  }, []);

  const settings = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    hideLegend: true,
  };

  const filtered = summary.find((item) => item.period === selectedPeriod);

  return (
    <div>
      <header className="grid grid-cols-2 p-4 gap-2 border-b border-gray-200">
        <div className="flex items-center">
          <SettingsIcon fontSize="large" />
          <h1 className="text-xl font-bold">DASHBOARD</h1>
        </div>
        <div className="flex flex-row-reverse">
          <KeyboardArrowRightIcon />
        </div>
      </header>

      <div className="p-4">
        <p className="text-sm text-gray-400">Periode</p>
        <select
          className="px-1 py-1 border rounded-lg w-48"
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
        >
          {summary.map((item, idx) => (
            <option key={idx} value={item.period}>
              {item.period}
            </option>
          ))}
        </select>
      </div>

      {filtered && (
        <div className="grid grid-cols-5 p-4 gap-2">
          {filtered.data.map((office, idx) => (
            <div key={idx}>
              <div className="flex gap-2">
                <img src="/Vector.png" alt="" />
                <h1 className="font-bold text-gray-400">{office.officeName}</h1>
              </div>

              {office.detailSummary.map((room, rIdx) => {
                const totalNominal = room.totalConsumption.reduce(
                  (acc, c) => acc + Number(c.totalPrice),
                  0
                );

                const totalPackages = room.totalConsumption.reduce(
                  (acc, c) => acc + Number(c.totalPackage),
                  0
                );

                const occupancy = Number(room.averageOccupancyPerMonth) || 0;
                const capacity = Number(room.capacity) || 0;

                const chartData = [
                  { label: 'Terpakai', value: occupancy, color: '#0088FE' },
                  {
                    label: 'Sisa',
                    value: Math.max(capacity - occupancy, 0),
                    color: '#808080',
                  },
                ];

                return (
                  <div key={rIdx} className="p-2 bg-gray-200 rounded-md mt-2">
                    <h1 className="font-bold">{room.roomName}</h1>
                    <div className="grid grid-cols-2">
                      <div className="flex flex-col">
                        <p className="text-sm">Presentasi Pemakaian</p>
                        <p className="text-lg font-bold">
                          {capacity > 0
                            ? ((occupancy / capacity) * 100).toFixed(1) + '%'
                            : '0%'}
                        </p>
                      </div>
                      <div>
                        <PieChart
                          series={[{ innerRadius: 12, outerRadius: 24, data: chartData }]}
                          {...settings}
                          width={50}
                          height={50}
                        />
                      </div>
                    </div>

                    <p className="text-sm">Nominal Konsumsi</p>
                    <p className="font-bold text-lg">
                      Rp {totalNominal.toLocaleString('id-ID')}
                    </p>

                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="flex flex-col gap-4">
                        {room.totalConsumption.map((cons, cIdx) => (
                          <p key={cIdx}>{cons.name}</p>
                        ))}
                      </div>
                      <div className="flex flex-col">
                        {room.totalConsumption.map((cons, cIdx) => (
                          <div key={cIdx} className="flex flex-col">
                            <p className="text-sm">{cons.totalPackage}</p>
                            <input
                              type="range"
                              value={cons.totalPackage}
                              max={totalPackages}
                              className='w-24'
                              readOnly
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

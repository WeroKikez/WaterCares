import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import AmountDisplay from "./AmountDisplay";
import { useEffect, useState } from "react";

import { db } from "../db/firebase";
import { onValue, ref } from "firebase/database";


const WaterTracker = () => {

  const [waterConsumed, setWaterConsumed] = useState(0);  

  const limit = 10;
  const available = limit - waterConsumed;
  const percentage = (waterConsumed * 100) / limit;

  useEffect(() => {
    const query = ref(db, "sensores/sensor_1");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();

      setWaterConsumed(data.toFixed(2));
    });
  }, []);

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex justify-center">
            <CircularProgressbar
                value={percentage}
                styles={buildStyles({
                    pathColor: percentage === 100 ? '#DC2626' : '#3B82f6',
                    trailColor: '#F5F5F5',
                    textSize: '15',
                    textColor: percentage === 100 ? '#DC2626' : '#3B82f6'
                })}
                text={`${percentage}%`}
            />
        </div>

        <div className="flex flex-col justify-center items-center gap-8">
            <AmountDisplay
                label="Limite"
                amount={limit}
            />

            <AmountDisplay
                label="Disponible"
                amount={available}
            />

            <AmountDisplay
                label="Consumida"
                amount={waterConsumed}
            />
        </div>
    </div>
    </>
  )
}

export default WaterTracker;
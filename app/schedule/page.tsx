export default function Schedule(){
  const schedule = [
    {time: '09:00', event: '迎宾签到'},
    {time: '10:00', event: '婚礼仪式'},
    {time: '12:00', event: '午宴开席'},
    {time: '14:00', event: '送宾合影'},
  ]
  return (
    <div className="container py-12">
      <h2 className="text-3xl font-bold text-center header-title">婚礼日程</h2>
      <div className="mt-6 space-y-3 max-w-md mx-auto">
        {schedule.map((s,i)=>(
          <div key={i} className="flex justify-between card">
            <span>{s.time}</span><span>{s.event}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

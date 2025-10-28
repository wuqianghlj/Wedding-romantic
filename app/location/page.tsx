export default function Location(){
  return (
    <div className="container py-12 text-center">
      <h2 className="text-3xl font-bold header-title">婚礼地点</h2>
      <div className="mt-6 card">
        <p>河南省舞钢市迎宾馆</p>
        <div className="mt-4">
          <iframe src="https://ditu.amap.com" className="w-full h-72 rounded" title="map"></iframe>
        </div>
        <a className="inline-block mt-4 px-4 py-2 card" href="https://uri.amap.com/marker?position=113.526,33.295&name=舞钢迎宾馆" target="_blank" rel="noreferrer">打开导航</a>
      </div>
    </div>
  )
}

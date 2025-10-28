'use client'
import { useState } from 'react'

export default function RSVP(){
  const [form,setForm] = useState({name:'',attending:'',guests:1,message:''})
  const [status,setStatus] = useState('')

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    setStatus('提交中...')
    try {
      const res = await fetch('/api/rsvp', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form)})
      if (res.ok) {
        setStatus('感谢您的回复，我们期待与您相见！')
        setForm({name:'',attending:'',guests:1,message:''})
      } else {
        setStatus('提交失败，请稍后重试。')
      }
    } catch (err) {
      console.error(err)
      setStatus('提交出错，请检查网络。')
    }
  }

  return (
    <div className="container py-12">
      <h2 className="text-3xl font-bold text-center header-title">出席回复</h2>
      <form onSubmit={handleSubmit} className="mt-6 max-w-md mx-auto space-y-3 card">
        <input required value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="姓名" className="w-full p-2 border rounded" />
        <select required value={form.attending} onChange={e=>setForm({...form, attending:e.target.value})} className="w-full p-2 border rounded">
          <option value="">请选择</option>
          <option value="yes">出席</option>
          <option value="no">因事不便</option>
        </select>
        <input type="number" min="1" value={form.guests} onChange={e=>setForm({...form, guests: Number(e.target.value)})} className="w-full p-2 border rounded" />
        <textarea value={form.message} onChange={e=>setForm({...form, message:e.target.value})} placeholder="留言（可选）" className="w-full p-2 border rounded" />
        <button className="w-full bg-[var(--accent)] text-white py-2 rounded">提交</button>
        {status && <p className="text-center mt-2">{status}</p>}
      </form>
    </div>
  )
}

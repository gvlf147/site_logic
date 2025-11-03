import React from 'react'

export default function Servicos() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">Serviços</h1>
      <p className="text-gray-300 mb-6">Descrição detalhada dos serviços oferecidos.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-gray-900 rounded">Serviço A</div>
        <div className="p-6 bg-gray-900 rounded">Serviço B</div>
      </div>
    </div>
  )
}

'use client';

import { useState, useMemo } from 'react';

interface DeviceItem {
  Make: string;
  Model: string;
  Size: string;
  Color: string;
  Condition: string;
  Carrier: string;
  'Available Qty': number;
  Price: string;
  'Currency Code': string;
  Sku: string;
}

export default function DeviceSearch({ initialDevices }: { initialDevices: DeviceItem[] }) {
  const [query, setQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');

  // Filter devices based on search query and brand selection
  const filteredDevices = useMemo(() => {
    return initialDevices.filter((device) => {
      const matchesQuery = 
        device.Model.toLowerCase().includes(query.toLowerCase()) ||
        device.Sku.toLowerCase().includes(query.toLowerCase()) ||
        device.Color.toLowerCase().includes(query.toLowerCase());
      
      const matchesBrand = selectedBrand === 'All' || device.Make === selectedBrand;

      return matchesQuery && matchesBrand;
    });
  }, [initialDevices, query, selectedBrand]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Search and Filter Inputs */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by model, SKU, or color (e.g., iPhone, S24)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg shadow-sm bg-white"
        >
          <option value="All">All Brands</option>
          <option value="Apple">Apple</option>
          <option value="Samsung">Samsung</option>
          <option value="ZTE Nubia">ZTE Nubia</option>
        </select>
      </div>

      {/* Results Table / Grid */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specs / Grade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDevices.length > 0 ? (
              filteredDevices.slice(0, 50).map((device, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{device.Make} {device.Model}</div>
                    <div className="text-xs text-gray-500">SKU: {device.Sku}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {device.Size || 'N/A'} • {device.Color} • <span className="font-semibold">{device.Condition}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {device['Available Qty']} available
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">
                    ${device.Price} {device['Currency Code']}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-500">
                  No devices found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
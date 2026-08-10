<form className="flex flex-row items-end gap-4 w-full max-w-4xl mx-auto p-4 bg-white rounded-xl shadow-md border border-gray-200">
  {/* Field 1 */}
  <div className="flex-1 min-w-[180px]">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Subject / Company Name
    </label>
    <input 
      type="text" 
      required 
      placeholder="e.g. Acme Corp" 
      className="w-full p-2 border rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 outline-none" 
      defaultValue=""
    />
  </div>

  {/* Field 2 */}
  <div className="w-32">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Amount ($)
    </label>
    <input 
      type="number" 
      placeholder="4200" 
      className="w-full p-2 border rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 outline-none" 
      defaultValue=""
    />
  </div>

  {/* Field 3 */}
  <div className="w-24">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Country (ISO)
    </label>
    <input 
      type="text" 
      maxLength={2} 
      className="w-full p-2 border rounded-md text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 outline-none" 
      defaultValue="CA"
    />
  </div>

  {/* Submit Button */}
  <div>
    <button 
      type="submit" 
      className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-md whitespace-nowrap transition-colors"
    >
      Submit Risk Decision
    </button>
  </div>
</form>

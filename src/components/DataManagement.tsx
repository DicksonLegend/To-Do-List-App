import React, { useState } from 'react';
import { Download, Upload, Trash2, Database, AlertTriangle, CheckCircle } from 'lucide-react';
import { useTaskStorage } from '../hooks/useLocalStorage';

const DataManagement: React.FC = () => {
  const { tasks, clearAllTasks, exportTasks, importTasks, getStorageInfo } = useTaskStorage();
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [importMessage, setImportMessage] = useState('');

  const storageInfo = getStorageInfo();

  const handleExport = () => {
    exportTasks();
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await importTasks(file);
      setImportStatus('success');
      setImportMessage('Tasks imported successfully!');
      setTimeout(() => {
        setImportStatus('idle');
        setImportMessage('');
      }, 3000);
    } catch (error) {
      setImportStatus('error');
      setImportMessage('Failed to import tasks. Please check the file format.');
      setTimeout(() => {
        setImportStatus('idle');
        setImportMessage('');
      }, 3000);
    }
    
    // Reset the input
    event.target.value = '';
  };

  const handleClearAll = () => {
    clearAllTasks();
    setShowConfirmClear(false);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
          <Database className="text-white" size={20} />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">Data Management</h3>
      </div>

      {/* Storage Information */}
      <div className="bg-gray-50/80 rounded-xl p-4 mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Storage Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Total Tasks:</span>
            <p className="font-semibold text-gray-800">{storageInfo.taskCount}</p>
          </div>
          <div>
            <span className="text-gray-500">Storage Used:</span>
            <p className="font-semibold text-gray-800">{storageInfo.storageSize}</p>
          </div>
          <div>
            <span className="text-gray-500">Last Modified:</span>
            <p className="font-semibold text-gray-800">
              {storageInfo.lastModified !== 'Never' 
                ? new Date(storageInfo.lastModified).toLocaleDateString()
                : 'Never'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Import/Export Status */}
      {importStatus !== 'idle' && (
        <div className={`flex items-center gap-2 p-3 rounded-xl mb-4 ${
          importStatus === 'success' 
            ? 'bg-emerald-100 text-emerald-700' 
            : 'bg-rose-100 text-rose-700'
        }`}>
          {importStatus === 'success' ? (
            <CheckCircle size={16} />
          ) : (
            <AlertTriangle size={16} />
          )}
          <span className="text-sm font-medium">{importMessage}</span>
        </div>
      )}

      {/* Actions */}
      <div className="space-y-4">
        {/* Export */}
        <div className="flex items-center justify-between p-4 bg-blue-50/50 rounded-xl border border-blue-200/50">
          <div>
            <h4 className="font-medium text-gray-800">Export Tasks</h4>
            <p className="text-sm text-gray-600">Download your tasks as a JSON file</p>
          </div>
          <button
            onClick={handleExport}
            disabled={tasks.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Download size={16} />
            Export
          </button>
        </div>

        {/* Import */}
        <div className="flex items-center justify-between p-4 bg-green-50/50 rounded-xl border border-green-200/50">
          <div>
            <h4 className="font-medium text-gray-800">Import Tasks</h4>
            <p className="text-sm text-gray-600">Upload a JSON file to restore tasks</p>
          </div>
          <label className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors cursor-pointer">
            <Upload size={16} />
            Import
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
        </div>

        {/* Clear All */}
        <div className="flex items-center justify-between p-4 bg-rose-50/50 rounded-xl border border-rose-200/50">
          <div>
            <h4 className="font-medium text-gray-800">Clear All Tasks</h4>
            <p className="text-sm text-gray-600">Permanently delete all tasks</p>
          </div>
          {!showConfirmClear ? (
            <button
              onClick={() => setShowConfirmClear(true)}
              disabled={tasks.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Trash2 size={16} />
              Clear All
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setShowConfirmClear(false)}
                className="px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleClearAll}
                className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition-colors text-sm"
              >
                <Trash2 size={14} />
                Confirm
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Local Storage Note */}
      <div className="mt-6 p-3 bg-amber-50/50 rounded-xl border border-amber-200/50">
        <p className="text-xs text-amber-700">
          <strong>Note:</strong> Your tasks are automatically saved to your browser's local storage. 
          They will persist between sessions but are specific to this browser and device.
        </p>
      </div>
    </div>
  );
};

export default DataManagement;

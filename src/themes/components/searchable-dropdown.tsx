'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Option {
  id: string;
  name: string;
  color?: string;
  icon?: React.ReactNode;
}

interface SearchableDropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  error,
  className = "",
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selected = options.find(option => option.id === value);
    setSelectedOption(selected || null);
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option);
    onChange(option.id);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setSearchTerm('');
      }
    }
  };

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          onClick={handleToggle}
          disabled={disabled}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-left ${
            error 
              ? 'border-red-500' 
              : 'border-gray-300'
          } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white cursor-pointer'}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center min-w-0 flex-1">
              {selectedOption && (
                <>
                  {selectedOption.icon && (
                    <div className="mr-2 flex-shrink-0">
                      {selectedOption.icon}
                    </div>
                  )}
                  <span className="truncate text-gray-900">
                    {selectedOption.name}
                  </span>
                </>
              )}
              {!selectedOption && (
                <span className="text-gray-500">
                  {placeholder}
                </span>
              )}
            </div>
            <svg 
              className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-hidden">
            {/* Search Input */}
            <div className="p-2 border-b border-gray-200">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                autoFocus
              />
            </div>

            {/* Options List */}
            <div className="max-h-48 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleOptionSelect(option)}
                    className={`w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors ${
                      option.id === value ? 'bg-purple-50 text-purple-700' : 'text-gray-900'
                    }`}
                  >
                    <div className="flex items-center">
                      {option.icon && (
                        <div className="mr-2 flex-shrink-0">
                          {option.icon}
                        </div>
                      )}
                      <span className="truncate">{option.name}</span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-3 py-2 text-gray-500 text-sm">
                  No options found
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default SearchableDropdown;

"use client";

import React, { useState } from "react";
import { FieldError, UseFormSetValue } from "react-hook-form";

interface MultiSelectAutocompleteFieldProps {
  label: string;
  placeholder?: string;
  suggestions: string[];
  value: string[]; // selected values
  error?: FieldError;
  onChange: (newValues: string[]) => void;
}

export default function MultiSelectAutocompleteField({
  label,
  placeholder,
  suggestions,
  value,
  error,
  onChange,
}: MultiSelectAutocompleteFieldProps) {
  const [filtered, setFiltered] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    if (!val.trim()) {
      setFiltered([]);
      return;
    }

    const matches = suggestions.filter(
      (s) =>
        s.toLowerCase().includes(val.toLowerCase()) && !value.includes(s)
    );
    setFiltered(matches);
  };

  const handleSelect = (item: string) => {
    onChange([...value, item]);
    setInputValue("");
    setFiltered([]);
  };

  const handleRemove = (item: string) => {
    onChange(value.filter((v) => v !== item));
  };

  return (
    <div className="flex flex-col w-full mb-4 relative">
      <label className="text-sm font-medium text-[var(--foreground)]">{label}</label>

      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border)] bg-[var(--muted)] focus:bg-[var(--background)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/40 outline-none transition-colors"
      />

      {/* Selected Chips */}
      <div className="flex flex-wrap gap-2 mt-2">
        {value.map((v) => (
          <span
            key={v}
            className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
          >
            {v}
            <button
              type="button"
              onClick={() => handleRemove(v)}
              className="text-red-500"
            >
              x
            </button>
          </span>
        ))}
      </div>

      {/* Suggestions Dropdown */}
      {filtered.length > 0 && (
        <ul className="absolute top-full mt-1 w-full bg-white border border-[var(--border)] rounded-lg shadow-md max-h-40 overflow-auto z-20">
          {filtered.map((item) => (
            <li
              key={item}
              className="px-4 py-2 text-sm hover:bg-[var(--muted)] cursor-pointer transition-colors"
              onClick={() => handleSelect(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p className="text-red-500 text-xs mt-1 animate-fadeIn">{error.message}</p>
      )}
    </div>
  );
}

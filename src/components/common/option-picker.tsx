'use client';

import React from "react";
import { Controller } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { ChevronsUpDownIcon, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type Option = {
    value: string;
    label: string;
};

interface OptionPickerProps<T extends Record<string, any>> {
    name: keyof T;
    control: any;
    placeholder?: string;
    options: Option[];
}

export function OptionPicker<T extends Record<string, any>>({
    name,
    control,
    placeholder = "Select an option",
    options,
}: OptionPickerProps<T>) {
    const [open, setOpen] = React.useState(false);

    return (
        <Controller
            name={name as string} // TS needs the cast
            control={control}
            render={({ field }) => (
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <button
                            type="button"
                            className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg text-sm bg-white hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {options.find(opt => opt.value === field.value)?.label || placeholder}
                            <ChevronsUpDownIcon className="ml-2 h-4 w-4 opacity-50" />
                        </button>
                    </PopoverTrigger>

                    <PopoverContent className="w-full p-0 bg-white rounded-lg shadow-lg border border-gray-200" align="start">
                        <Command className="w-full">
                            <CommandList>
                                <CommandEmpty className="px-4 py-2 text-sm text-gray-500">No options found.</CommandEmpty>
                                <CommandGroup>
                                    {options.map(option => (
                                        <CommandItem
                                            key={option.value}
                                            value={option.value}
                                            onSelect={(currentValue) => {
                                                field.onChange(currentValue);
                                                setOpen(false);
                                            }}
                                            className="w-full px-4 py-3 rounded-md hover:bg-gray-100 flex items-center text-sm"
                                        >
                                            <CheckIcon
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    field.value === option.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {option.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            )}
        />
    );
}

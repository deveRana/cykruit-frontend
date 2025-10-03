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
            name={name as string}
            control={control}
            render={({ field }) => (
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <button
                            type="button"
                            className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-white hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-left"
                        >
                            <span className={field.value ? "text-gray-900" : "text-gray-400"}>
                                {options.find(opt => opt.value === field.value)?.label || placeholder}
                            </span>
                            <ChevronsUpDownIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        </button>
                    </PopoverTrigger>

                    <PopoverContent
                        className="p-0 bg-white rounded-lg shadow-lg border border-gray-300 max-h-60 overflow-y-auto"
                        align="start"
                        sideOffset={4}
                        style={{ width: 'var(--radix-popover-trigger-width)' }}
                    >
                        <Command>
                            <CommandList>
                                <CommandEmpty className="px-4 py-3 text-sm text-gray-500 text-center">
                                    No options found.
                                </CommandEmpty>
                                <CommandGroup className="p-0">
                                    {options.map((option, index) => (
                                        <CommandItem
                                            key={option.value}
                                            value={option.value}
                                            onSelect={(currentValue) => {
                                                field.onChange(currentValue);
                                                setOpen(false);
                                            }}
                                            className={cn(
                                                "px-4 py-3 hover:bg-gray-50 transition-colors flex items-center cursor-pointer",
                                                index !== options.length - 1 && "border-b border-gray-100"
                                            )}
                                        >
                                            <CheckIcon
                                                className={cn(
                                                    "mr-2 h-4 w-4 flex-shrink-0 text-blue-600",
                                                    field.value === option.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            <span className="text-sm text-gray-900">{option.label}</span>
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
"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Spinner } from "@/components/ui/spinner"

export type LangOption = {
  name: string
  status: "empty" | "loading" | "loaded"
}

export function LanguagePicker({
  langs,
  selected,
  onSelected,
}: {
  langs: LangOption[]
  selected: LangOption
  onSelected: (lang: LangOption) => void
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className=" justify-between  w-64"
        >
          {selected.status === "loading" ? (
            <Spinner />
          ) : (
            <Check className={cn("mr-2 h-4 w-4")} />
          )}
          {selected.name}
          <span className="flex-1" />
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <ScrollArea style={{ height: "50vh" }}>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {langs.map((item) => (
                <LangItem
                  key={item.name}
                  item={item}
                  selected={selected}
                  onSelect={(currentValue) => {
                    setOpen(false)
                    onSelected(
                      langs.find((item) => item.name === currentValue)!
                    )
                  }}
                />
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

function LangItem({
  item,
  onSelect,
  selected,
}: {
  item: LangOption
  onSelect: (value: string) => void
  selected: LangOption
}) {
  const isLoaded = item.status === "loaded"
  const isSelected = item.name === selected.name
  const icon =
    item.status === "loading" ? (
      <Spinner />
    ) : (
      <Check
        className={cn("mr-2 h-4 w-4", isSelected ? "opacity-100" : "opacity-0")}
      />
    )
  return (
    <CommandItem key={item.name} onSelect={onSelect}>
      {icon}
      <span className={isLoaded ? "text-white" : "text-gray-400"}>
        {item.name}
      </span>
    </CommandItem>
  )
}
